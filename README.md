# Chess Position Analysis API
This API allows you to evaluate chess positions and specific moves using [_Stockfish_](https://github.com/lichess-org/stockfish.js) and [_Lichess Cloud Evaluation_](https://lichess.org/api#tag/Analysis/operation/apiCloudEval). It can evaluate chess positions based on FEN strings and assess individual moves. Additionally, it provides useful information such as the best move according to the engine, move classification, and details about the opening theory, if applicable.

## Getting Started
1. Clone Repo
```
git clone https://github.com/luis-gouveia/chess-position-analysis.git
```
2. Install NPM packages
```
npm install
```
3. Build the app
```
npm build
```
4. Start the server
```
npm run start
```

## Endpoints
<sub><sup>[ Base URL: http://localhost:3000/api/v1 ]</sup></sub>

### GET `/analysis/position`
Returns the evaluation of a given chess position based on the provided FEN string. The evaluation is performed using the _Stockfish_ and _Lichess Cloud Evaluation_.

#### Request
<details open>
<summary>Parameters</summary>

| name | required | data_type | description | default |
|--|--|--|--|--|
| fen | true | string | FEN string representing the current game state. | - |
| depth | true | number | Search depth used for the Stockfish evaluation. | - |
| prespective | false | 'white', 'black' | Perspective from which the evaluation should be returned. | 'white' |

Example:
```json
{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "depth": 20,
  "prespective": "white",
}
```
</details>

#### Response
<details>
<summary>200 Response</summary>

| name | required | data_type | description |
|--|--|--|--|
| bestMove | false | string | The best move recommended by the engine in SAN.  (`undefined` if the provided FEN string represents a game that already ended) |
| evaluation | true | string | Engine's evaluation of the position in _centipawns_. |
| opening | false | string | Information about the opening if the position corresponds to a known chess opening. |

Example:
```json
{
  "data": {
    "bestMove": "Ba5",
    "evaluation": "37",
    "opening": "Nimzo-Indian Defense: St. Petersburg Variation",
  }
}
```
</details>

<details>
<summary>400 Response</summary>

| name | required | data_type | description |
|--|--|--|--|
| error | true | string | A message describing the reason for the error, providing details about the issue with the request. |
| data | false | object[] | Additional context about the error, such as invalid parameters or missing required fields. |

Example:
```json
{
	"error": "Invalid request data.",
	"data": [
		{
			"argument": "depth",
			"message": "Number must be less than or equal to 24"
		}
	]
}
```
</details>

### GET `/analysis/move`
Evaluates a specific move in a given chess position. The evaluation is performed using the _Stockfish_ and _Lichess Cloud Evaluation_ and provides insights into the strength of the move compared to the best possible move in the position.

#### Request
<details open>
<summary>Parameters</summary>

| name | required | data_type | description | default |
|--|--|--|--|--|
| fen | true | string | FEN string representing the current game state. | - |
| depth | true | number | Search depth used for the Stockfish evaluation. | - |
| move | true | string | SAN or UCI representation of the move made in the provided FEN string. | - |

Example:
```json
{
  "fen": "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  "depth": 20,
  "move": "e4",
}
```
</details>

#### Response
<details >
<summary>200 Response</summary>

| name | required | data_type | description |
|--|--|--|--|
| bestMove | false | string | The best move recommended by the engine in SAN. (`undefined` if the provided FEN string represents a game that already ended) |
| evaluation | true | string | Engine's evaluation of the position in _centipawns_. |
| classification | false | 'BEST', 'BOOK', 'GOOD', 'INACCURACY', 'MISTAKE', 'BLUNDER' | Classification of the move made in the provided FEN string. (`undefined` if the provided FEN string represents a game that already ended) |
| opening | false | string | Information about the opening if the position corresponds to a known chess opening. |

Example:
```json
{
  "data": {
    "bestMove": "a3",
    "evaluation": "-37",
    "classification": "BOOK",
    "opening": "Nimzo-Indian Defense: St. Petersburg Variation"
  }
}
```
</details>

<details>
<summary>400 Response</summary>

| name | required | data_type | description |
|--|--|--|--|
| error | true | string | A message describing the reason for the error, providing details about the issue with the request. |
| data | false | object[] | Additional context about the error, such as invalid parameters or missing required fields. |

Example:
```json
{
	"error": "Invalid request data.",
	"data": [
		{
			"argument": "depth",
			"message": "Number must be less than or equal to 24"
		}
	]
}
```
</details>

## License
This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.  
See the [LICENSE](LICENSE) file for details.

## Acknowledgments
This project includes code adapted from [Lila (Lichess)](https://github.com/lichess-org/lila),  
licensed under the [AGPL-3.0 License](https://www.gnu.org/licenses/agpl-3.0.html).