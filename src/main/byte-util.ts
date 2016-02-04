/**
 * Renvoie les 4 premiers bits: 0x000N
 */
export function nibble0(value: number): number {
    return value & 0xF;
}

/**
 * Renvoie les 4 bits en seconde position: 0x00N0
 */
export function nibble1(value: number): number {
    return (value & 0xF0) >> 4;
}

/**
 * Renvoie les 4 avant dernier bits: 0x0N00
 */
export function nibble2(value: number): number {
    return (value & 0xF00) >> 8;
}

/**
 * Renvoie les 4 derniers bits: 0xN000
 */
export function nibble3(value: number): number {
    return (value & 0xF000) >> 12;
}

/**
 * Renvoie l'octet de poids faible: 0x00NN
 */
export function byte0(value: number): number {
    return value & 0xFF;
}

/**
 * Renvoie l'octet de poids fort: 0xNN00
 */
export function byte1(value: number): number {
    return (value & 0xFF00) >> 8;
}
