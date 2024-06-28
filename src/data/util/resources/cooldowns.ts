import { Cooldown } from "../classes/cooldown";

const twelveHourCooldown = new Cooldown("horoscope", 43200000);

export const COOLDOWNS = {
    horoscope: twelveHourCooldown,
    compatibility: twelveHourCooldown
}