import Bowman from '../bowman';
import Daemon from '../daemon';
import Magician from '../magician';
import Undead from '../undead';
import Swordsman from '../swordsman';
import Zombie from '../zombie';
import Character from '../character';

describe.each([
  [Bowman, 'Bowman', 25, 25],
  [Swordsman, 'Swordsman', 40, 10],
  [Magician, 'Magician', 10, 40],
  [Undead, 'Undead', 25, 25],
  [Zombie, 'Zombie', 40, 10],
  [Daemon, 'Daemon', 10, 40],
])('create class', (Class, type, attack, defence) => {
  test('trow error, when passed not a string', () => {
    const result = () => new Class(123);
    expect(result).toThrow('Name must be a string with the length from 2 to 10');
  });

  test('trow error, when passed less than 2 symbols', () => {
    const result = () => new Class('a');
    expect(result).toThrow('Name must be a string with the length from 2 to 10');
  });

  test('trow error, when passed more than 10 symbols', () => {
    const result = () => new Class('abcdefghijk');
    expect(result).toThrow('Name must be a string with the length from 2 to 10');
  });

  test('wrong type', () => {
    const result = () => new Character('player', 'Character');
    expect(result).toThrow('Wrong type');
  });

  test('correct name and type', () => {
    const result = new Class('player');
    expect(result).toEqual({
      name: 'player',
      type,
      health: 100,
      level: 1,
      attack,
      defence,
    });
  });

  test('levelup works without errors', () => {
    const result = new Class('player');
    result.levelUp();
    delete result.name;
    delete result.type;

    expect(result).toEqual({
      health: 100,
      level: 2,
      attack: attack + (attack * 0.2),
      defence: defence + (defence * 0.2),
    });
  });

  test('levelup works with errors', () => {
    const player = new Class('player');
    player.health = 0;
    const result = () => player.levelUp();

    expect(result).toThrow('Can not increase the level of deceased');
  });

  test('damage works without errors', () => {
    const player = new Class('player');
    player.damage(50);

    expect(player.health).toEqual(100 - (50 * (1 - player.defence / 100)));
  });

  test('damage works with errors', () => {
    const player = new Class('player');
    player.health = -50;
    player.damage(50);
    const result = player.health;
    const { health } = player;

    expect(result).toEqual(health);
  });
});
