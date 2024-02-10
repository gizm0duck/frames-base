

interface FactionMap { [key: number]: String[]}

export const characters:FactionMap = {
    0: ['guardian-mara', 'scavenger-yael', 'elder-solon', 'engineer-lexa', 'tracker-finn'],
    1: ['captain-celestia', 'orion-the-navigator', 'lyra-keeper-of-lore', 'siruis-the-starblade-warrior', 'nebula-the-mystic-healer'],
    2: ['cyber-commander-zeta', 'tech-priestess-ada', 'neon-knight-vortex', 'hacker-nomad-lynx', 'mechanic-genius-rho'],
    3: ['eon-sage', 'chrona-mystic', 'temporal-knight', 'aeon-weaver', 'era-sentinel']
}

export const getRandomCharacter = function(factionId:number):String {
    let characterArray = characters[factionId];
    return characterArray[Math.floor(Math.random()*characterArray.length)];
}

  