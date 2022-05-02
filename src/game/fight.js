export function fight(heroPower, monsterPower) {
  if (heroPower > monsterPower) {
    return "success";
  } else {
    return "fail";
  }
}
