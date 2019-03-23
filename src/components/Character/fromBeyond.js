const STAT = {
  STR: { ID: 1, BONUS: 'strength-score' },
  DEX: { ID: 2, BONUS: 'dexterity-score' },
  CON: { ID: 3, BONUS: 'constitution-score' },
  INT: { ID: 4, BONUS: 'intelligence-score' },
  WIS: { ID: 5, BONUS: 'wisdom-score' },
  CHA: { ID: 6, BONUS: 'charisma-score' },
};

const armorClass = (character) => {
  const defaultArmor = 10;

  const armor = character.inventory
    .filter(i => i.equipped && !!i.definition.armorClass)
    .map(i => i.definition.armorClass)
    .reduce((acc, cur) => acc + cur, 0);

  const withoutArmor = character.modifiers.class
    .find(mod => mod.subType === 'unarmored-armor-class');

  const armorModifier = withoutArmor ? withoutArmor.value : 0;

  const dexMod = statModifier(character, STAT.DEX);

  return dexMod + (armor || defaultArmor + armorModifier);
};

const conditions = (config, character) => character.conditions.map(cond =>
  config.conditions.find(
    configCondition => configCondition.definition.id === cond.id
  ).definition.name
);

const hitPoints = (character) => {
  const levelConstitutions = statModifier(character, STAT.CON) * level(character);

  const max = character.overrideHitPoints
    ? character.overrideHitPoints
    : character.baseHitPoints + character.bonusHitPoints + levelConstitutions;

  const current = max - character.removedHitPoints;
  const temp = character.temporaryHitPoints ? character.temporaryHitPoints : null;
  const hitPointPercentage = temp ? 1 : current / max;
  const status = hitPointStatus(hitPointPercentage);

  return {current, max, temp, status};
}

const hitPointStatus = (hitPointPercentage) => {
  switch (Math.floor(hitPointPercentage * 10)) {
    case 0:
    case 1:
    case 2:
      return 'critical';
    case 3:
    case 4:
    case 5:
      return 'bloodied';
    default:
      return 'healthy';
  }
}

const level = (character) => character.classes[0].level;

const speed = (character) => {
  const walkingModifier = character.modifiers.race
    .find(mod => mod.subType === 'innate-speed-walking');

  return walkingModifier
    ? walkingModifier.value
    : character.race.weightSpeeds.normal.walk;
};

const statBonus = (character, stat) =>
  character.modifiers.race.filter(modifier =>
    modifier.type === 'bonus' && modifier.subType === stat.BONUS
  ).reduce((acc, cur) => acc + cur.value, 0);

const statModifier = (character, stat) =>
  Math.floor((statValue(character, stat) - 10) / 2);

const statValue = (character, stat) =>
  character.stats.find(s => s.id === stat.ID).value
  + statBonus(character, stat);

export default function fromBeyond(config, character) {
  return {
    id: character.id,
    armorClass: armorClass(character),
    avatarUrl: character.avatarUrl || character.race.portraitAvatarUrl,
    conditions: conditions(config, character),
    hitPoints: hitPoints(character),
    inspiration: character.inspiration,
    name: character.name,
    notes: character.notes,
    speed: speed(character),
  };
};
