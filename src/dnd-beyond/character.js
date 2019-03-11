const STAT_ID = {
  CON: 3,
};

const valueToModifier = v => Math.floor((v - 10) / 2);

const constitutionModifier = c =>
  valueToModifier(c.stats.filter(s => s.id === STAT_ID.CON)[0].value);

const hitPoints = c => {
  const levelConstitutions = constitutionModifier(c) * c.classes[0].level;
  const max = c.baseHitPoints + levelConstitutions;

  return {
    current: c.overrideHitPoints || max - c.removedHitPoints,
    max: c.overrideHitPoints || max,
    temp: c.temporaryHitPoints,
  };
};

const character = c => ({
  id: c.id,
  avatarUrl: c.avatarUrl,
  name: c.name,
  hitPoints: hitPoints(c),
});

export default character;
