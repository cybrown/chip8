/**
 * Renvoie les 4 premiers bits
 */
export function nibble0(value: number): number {
    return value & 0xF;
}

/**
 * Renvoie les 4 bits en seconde position
 */
export function nibble1(value: number): number {
    return (value & 0xF0) >> 4;
}

/**
 * Renvoie les 4 avant dernier bits
 */
export function nibble2(value: number): number {
    return (value & 0xF00) >> 8;
}

/**
 * Renvoie les 4 derniers bits
 */
export function nibble3(value: number): number {
    return (value & 0xF000) >> 12;
}

/**
 * Renvoie l'octet de poids faible
 */
export function byte0(value: number): number {
    return value & 0xFF;
}

/**
 * Renvoie l'octet de poids fort
 */
export function byte1(value: number): number {
    return (value & 0xFF00) >> 8;
}
