import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../modules/bol-core/services/game.service';
import { GamePlayOutcomeMessage } from '../../modules/bol-core/messages/game-play-outcome-message';
import { NoelEventListenerManager } from 'noel/dist/types/event-listener-manager';
import { AuthService } from '../../modules/bol-core/services/auth.service';
import * as anime from 'animejs';
import { LoggerFactoryService, Logolous } from '../../modules/bol-core/services/logger-factory.service';
import { RouterHelperService } from '../../services/router-helper.service';

@Component({
    selector: 'bol-game-route',
    templateUrl: './game-route.component.html',
    styleUrls: ['./game-route.component.scss']
})
export class GameRouteComponent implements OnInit, OnDestroy, AfterViewInit {

    private static readonly GAME_SLOT_CLASS = '.game-slot';
    private static readonly STONE_ANIMATION_DURATION = 3000;

    private onGamePlayOutcomeMessageListener: NoelEventListenerManager;
    private logger: Logolous;

    private slotsDictionary;
    private stonesDictonary;

    bootstrapped: boolean;
    opponentUserName: string;
    userName: string;
    nextTurnHolderUserName: string;
    isOpponentTurn: boolean;
    refereeText: string;
    isFinished: boolean;
    winnerUserName: string;

    userScore: number;
    opponentScore: number;

    @ViewChild('opponentStorageSlotRef') opponentStorageSlotRef;
    @ViewChild('opponentSlotsRef') opponentSlotsRef;
    @ViewChild('userSlotsRef') userSlotsRef;
    @ViewChild('userStorageSlotRef') userStorageSlotRef;
    @ViewChild('stonePrototypeRef') stonePrototypeRef;

    userSlots = new Array(6);

    constructor(loggerFactoryService: LoggerFactoryService,
                private ngZone: NgZone,
                private routerHelperService: RouterHelperService,
                private gameService: GameService,
                private authService: AuthService) {
        this.logger = loggerFactoryService.make('GameRouteComponent');
    }

    ngOnInit() {
        this.refereeText = 'Waiting for opponent...';
        this.gameService.connectToCurrentGame();
        this.onGamePlayOutcomeMessageListener = this.gameService.onGamePlayOutcomeMessage((gameplayOutcomeMessage) => {
            this.ngZone.run(() => {
                this.onGamePlayOutcomeMessage(gameplayOutcomeMessage);
            });
        });
    }

    ngOnDestroy() {
        this.onGamePlayOutcomeMessageListener.remove();
        this.gameService.disconnectFromCurrentGame();
    }

    onGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        if (!this.bootstrapped) {
            this.bootstrapWithGamePlayOutcomeMessage(gamePlayOutcomeMessage);
            this.bootstrapped = true;
        }
        this.updateBoardWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
    }

    quitGame() {
        return this.gameService.quitCurrentGame().then(() => {
            this.logger.info('Quitted current game successfully');
        }).catch((err) => {
            this.logger.info('Could not quit current game!');
        }).finally(() => {
            this.routerHelperService.goToGames();
        })
    }

    private bootstrapWithGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        this.bootstrapSlotsDictionaryWithGamePlayOutcomeMessage(gamePlayOutcomeMessage);
        this.bootstrapStonesWithGamePlayOutcomeMessage(gamePlayOutcomeMessage);
        this.bootstrapUserNamesWithGamePlayOutcomeMessage(gamePlayOutcomeMessage);
    }

    private bootstrapSlotsDictionaryWithGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        const userStorageSlotElement = this.userStorageSlotRef.nativeElement;
        let userSlotsElements = this.userSlotsRef.nativeElement.querySelectorAll(GameRouteComponent.GAME_SLOT_CLASS);

        userSlotsElements = [].slice.call(userSlotsElements);
        userSlotsElements.push(userStorageSlotElement);

        const opponentStorageSlotElement = this.opponentStorageSlotRef.nativeElement;
        let opponentSlotsElements = this.opponentSlotsRef.nativeElement.querySelectorAll(GameRouteComponent.GAME_SLOT_CLASS);

        opponentSlotsElements = [].slice.call(opponentSlotsElements).reverse();
        opponentSlotsElements.push(opponentStorageSlotElement);

        const user = this.authService.getLoggedInUser();
        const userName = user.getName();
        const isUserB = userName === gamePlayOutcomeMessage.userBName;

        let slots = [];

        if (isUserB) {
            slots = slots.concat(opponentSlotsElements, userSlotsElements);
        } else {
            slots = slots.concat(userSlotsElements, opponentSlotsElements);
        }

        const slotsDictionary = {};

        slots.forEach((slot, index) => {
            const slotId = index + 1;
            this.processSlotElementWithId(slot, slotId);
            slotsDictionary[slotId] = slot;
        });
        this.slotsDictionary = slotsDictionary;
    }

    private bootstrapStonesWithGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        if (!gamePlayOutcomeMessage.slots) return;

        const stonePrototypeElement = this.getStonePrototypeElement();

        const stonesDictionary = {};

        gamePlayOutcomeMessage.slots.forEach((slot) => {
            slot.stones.forEach((stone) => {
                const stoneElement = stonePrototypeElement.cloneNode(true) as HTMLElement;
                this.processStoneElement(stoneElement);
                stonesDictionary[stone.id] = stoneElement;
                this.userStorageSlotRef.nativeElement.appendChild(stoneElement);
            });
        });

        this.stonesDictonary = stonesDictionary;
    }

    private bootstrapUserNamesWithGamePlayOutcomeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        const userName = this.authService.getLoggedInUser().getName();

        let opponentUserName = gamePlayOutcomeMessage.userBName;

        if (opponentUserName === userName) {
            opponentUserName = gamePlayOutcomeMessage.userAName;
        }

        this.userName = userName;
        this.opponentUserName = opponentUserName;
    }

    private updateBoardWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        this.updateTextsWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
        this.updateFlagsWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
        this.updateNextTurnHolderWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
        this.updateScoresWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
        this.updateStonesPositionsWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
    }

    private updateFlagsWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        this.isOpponentTurn = gamePlayOutcomeMessage.nextTurnHolderUserName === this.opponentUserName;
        this.isFinished = gamePlayOutcomeMessage.gameFinished;
    }

    private updateTextsWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        this.updateRefereeTextWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
        if (gamePlayOutcomeMessage.gameFinished) {
            this.updateWinnerTextWithGamePlayOutComeMessage(gamePlayOutcomeMessage);
        }
    }

    private updateWinnerTextWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        this.winnerUserName = gamePlayOutcomeMessage.winnerUserName;
    }

    private updateRefereeTextWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        let refereeText;
        if (this.nextTurnHolderUserName === gamePlayOutcomeMessage.nextTurnHolderUserName) {
            refereeText = `Extra turn for ${gamePlayOutcomeMessage.nextTurnHolderUserName}`;
        } else {
            if (gamePlayOutcomeMessage.gameFinished) {
                refereeText = `Game finished! Winner is ${gamePlayOutcomeMessage.winnerUserName}`;
            } else {
                refereeText = `It's ${gamePlayOutcomeMessage.nextTurnHolderUserName}'s turn`;
            }
        }
        this.refereeText = refereeText;
    }

    private updateNextTurnHolderWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        this.nextTurnHolderUserName = gamePlayOutcomeMessage.nextTurnHolderUserName;
    }

    private updateScoresWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        // Update scores
        const userName = this.authService.getLoggedInUser().getName();

        let userScore;
        let opponentScore;

        if (userName === gamePlayOutcomeMessage.userBName) {
            userScore = gamePlayOutcomeMessage.userBScore;
            opponentScore = gamePlayOutcomeMessage.userAScore;
        } else {
            userScore = gamePlayOutcomeMessage.userAScore;
            opponentScore = gamePlayOutcomeMessage.userBScore;
        }

        this.userScore = userScore;
        this.opponentScore = opponentScore;
    }

    private updateStonesPositionsWithGamePlayOutComeMessage(gamePlayOutcomeMessage: GamePlayOutcomeMessage) {
        if (!gamePlayOutcomeMessage.slots) return;
        gamePlayOutcomeMessage.slots.forEach((slot) => {
            const slotElement = this.slotsDictionary[slot.id];

            // Update slots stone count
            const stonesAmountElement = slotElement.querySelector('.game-slot-stones-amount');
            stonesAmountElement.innerHTML = slot.stones.length;

            // Move stones accordingly
            slot.stones.forEach((stone) => {
                const stoneElement = this.stonesDictonary[stone.id];
                this.moveStoneElementToSlotElement(stoneElement, slotElement);
            });
        });
    }

    private moveStoneElementToSlotElement(stoneElement: HTMLElement, slotElement: HTMLElement) {
        const stoneBoundingClientRect = stoneElement.getBoundingClientRect();
        const slotBoundingClientRect = slotElement.getBoundingClientRect();

        const alreadyOverlapping = !(stoneBoundingClientRect.right < slotBoundingClientRect.left ||
            stoneBoundingClientRect.left > slotBoundingClientRect.right ||
            stoneBoundingClientRect.bottom < slotBoundingClientRect.top ||
            stoneBoundingClientRect.top > slotBoundingClientRect.bottom);

        if (alreadyOverlapping) return;

        const safeLeftOffset = (slotBoundingClientRect.width * 0.4);
        const safeTopOffset = slotBoundingClientRect.top * 0.2;

        const leftOffset = this.getRandomIntFromInterval(safeLeftOffset, slotBoundingClientRect.width - safeLeftOffset);
        const topOffset = this.getRandomIntFromInterval(safeTopOffset, slotBoundingClientRect.height - safeTopOffset);

        const stoneElementNewLeft = slotBoundingClientRect.left + leftOffset - (stoneBoundingClientRect.width / 2);
        const stoneElementNewTop = slotBoundingClientRect.top + topOffset - (stoneBoundingClientRect.height / 2);

        anime({
            targets: stoneElement,
            left: stoneElementNewLeft,
            top: stoneElementNewTop,
            duration: 2500
        }).play();
    }

    private getStonePrototypeElement(): Element {
        return this.stonePrototypeRef.nativeElement;
    }

    private processStoneElement(stoneElement: HTMLElement) {
        stoneElement.classList.remove('hidden');
        stoneElement.style.backgroundColor = this.getRandomStoneColor();
    }

    private processSlotElementWithId(slotElement: HTMLElement, slotId: number) {
        if (slotElement.classList.contains('game-slot--user') && !slotElement.classList.contains('game-slot--storage')) {
            this.processUserSlotElementWithId(slotElement, slotId);
        }
    }

    private processUserSlotElementWithId(userSlotElement: HTMLElement, slotId: number) {
        userSlotElement.addEventListener('click', () => {
            this.playAtSlotWithId(slotId);
        });
    }

    private playAtSlotWithId(slotId: number) {
        this.gameService.playAtSlotWithIdForCurrentGame(slotId).then(() => {
            this.logger.info(`Succesfully played at slot ${slotId}`);
        }).catch((err) => {
            this.logger.error(`Could not play at slot ${slotId} with error:`, err);
        });
    }

    private getRandomStoneColor(): string {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    }

    private getRandomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}
