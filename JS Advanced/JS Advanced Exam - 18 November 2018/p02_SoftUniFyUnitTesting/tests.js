let SoftUniFy = require('./app');

let expect = require('chai').expect;
let assert = require('chai').assert;

describe('SoftUniFy tests', function () {

    let softUniFy;
    beforeEach(() => {
        softUniFy = new SoftUniFy();
    });

    it('should contains allSongs property initialized default as empty obj', () => {
        assert.isEmpty(softUniFy.allSongs);
    });

    describe('downloadSong() tests', () => {
        it('If don`t have passed artist should add id', () => {
            softUniFy.downloadSong('Pesho', 'Mega Hit Song', 'some lyrics');
            let artistCheck = softUniFy.allSongs['Pesho'];
            assert.isObject(artistCheck);
        });
        it('check rate property', () => {
            softUniFy.downloadSong('Pesho', 'Mega Hit Song', 'some lyrics');
            let artistCheck = softUniFy.allSongs['Pesho'];
            assert.isTrue(artistCheck.hasOwnProperty('rate'));
            assert.equal(artistCheck.rate, 0);
        });
        it('check votes property', () => {
            softUniFy.downloadSong('Pesho', 'Mega Hit Song', 'some lyrics');
            let artistCheck = softUniFy.allSongs['Pesho'];
            assert.isTrue(artistCheck.hasOwnProperty('votes'));
            assert.equal(artistCheck.votes, 0);
        });
        it('check songs property', () => {
            softUniFy.downloadSong('Pesho', 'Mega Hit Song', 'some lyrics');
            let artistCheck = softUniFy.allSongs['Pesho'];
            assert.isTrue(artistCheck.hasOwnProperty('songs'));
            assert.isArray(artistCheck.songs);
        });
        it('songs property, should contain all songs from the current artist', () => {
            softUniFy.downloadSong('Pesho', 'MegaHit', 'some lyrics');
            softUniFy.downloadSong('Pesho', 'MegaSong', 'lyrics');

            let currentArtistSongs = softUniFy.allSongs['Pesho'].songs.join(', ');
            assert.equal(currentArtistSongs, `MegaHit - some lyrics, MegaSong - lyrics`);
        });
        it('should return the entire Class', () => {
           let returnValue = softUniFy.downloadSong('Pesho', 'Mega Hit Song', 'some lyrics');
           assert.isTrue(returnValue instanceof SoftUniFy);
           assert.isObject(returnValue);
        });
    });

    describe('playSong(song) tests', () => {
        beforeEach(() => {
            softUniFy.downloadSong('Pesho', 'MegaHit', 'some lyrics');
            softUniFy.downloadSong('Pesho', 'MegaSong', 'lyrics');
            softUniFy.downloadSong('Gosho', 'MegaSong', 'lyrics123');
        });

        it('if current song does not exist should return message', () => {
            let result = softUniFy.playSong('songName');
            let expected = `You have not downloaded a songName song yet. Use SoftUniFy's function downloadSong() to change that!`;
            assert.equal(result, expected);
        });

        it('if do not have at least one downloaded song should return message', () => {
            let obj = new SoftUniFy();
            let result = obj.playSong('songName');
            let expected = `You have not downloaded a songName song yet. Use SoftUniFy's function downloadSong() to change that!`;
            assert.equal(result, expected);
        });

        it('If contains songs with passed name, should return correct result', () => {
            let result = softUniFy.playSong('MegaSong');
            let expected = `Pesho:\n`
                + `MegaSong - lyrics\n`
                + `Gosho:\n`
                + `MegaSong - lyrics123\n`;
            assert.equal(result, expected);
        });
    });

    describe('songList() tests', () => {
        it('...', () => {
           //TODO...
        });
    });

    describe('rateArtist() tests', () => {
       it('...', () => {
           //TODO...
       })
    });
});