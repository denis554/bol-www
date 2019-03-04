import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../../../modules/bol-core/models/game';

@Pipe({
    name: 'searchGame',
    pure: false
})
export class SearchGamePipe implements PipeTransform {

    transform(games: Game[], filter: string): any {
        if (!games || !filter) {
            return games;
        }
        // filter games array, games which match and return true will be
        // kept, false will be filtered out
        return games.filter(game => game.getName().toUpperCase().indexOf(filter.toUpperCase()) !== -1);
    }
}
