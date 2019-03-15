
const STAT_ID = {
  CON: 3,
};

const conditions = (config, character) => character.conditions.map(cond =>
  config.conditions.find(
    configCondition => configCondition.definition.id === cond.id
  ).definition.name
);

const constitutionModifier = (character) => valueToModifier(
  character.stats.filter(s => s.id === STAT_ID.CON)[0].value
);

const hitPoints = (character) => {
  const levelConstitutions = constitutionModifier(character) * level(character);

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

const valueToModifier = (v) => Math.floor((v - 10) / 2);

export default function fromBeyond(config, { character }) {
  return {
    id: character.id,
    avatarUrl: character.avatarUrl || character.race.portraitAvatarUrl,
    conditions: conditions(config, character),
    hitPoints: hitPoints(character),
    name: character.name,
    notes: character.notes,
  }
};
