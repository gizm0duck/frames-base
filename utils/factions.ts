
export interface Faction {
    id: number
    name: string
    image: string
    ipfs: string
}
interface FactionMap { [key: number]: Faction}

export const factions:FactionMap = {
    0: {
        id: 0,
        name: "Earth Bound Remnants",
        image: "earthbound-remnants",
        ipfs: "ipfs://Qmejec3wBTYP7GtsKLUCBbt1CnWSD7pMcnpzC733YEtUnP/FactionAffiliation/earthbound-remnants.json"
    },
    1: {
        id: 1,
        name: "Star Pilgrims",
        image: "star-pilgrims",
        ipfs: "ipfs://Qmejec3wBTYP7GtsKLUCBbt1CnWSD7pMcnpzC733YEtUnP/FactionAffiliation/star-pilgrims.json"
    },
    2: {
        id: 2,
        name: "Techno Covenant",
        image: "techno-covenant",
        ipfs: "ipfs://Qmejec3wBTYP7GtsKLUCBbt1CnWSD7pMcnpzC733YEtUnP/FactionAffiliation/techno-covenant.json"
    },
    3: {
        id: 3,
        name: "Time Weavers",
        image: "time-weavers",
        ipfs: "ipfs://Qmejec3wBTYP7GtsKLUCBbt1CnWSD7pMcnpzC733YEtUnP/FactionAffiliation/time-weavers.json"
    }
}

export const getFaction = function(factionId:number):Faction|undefined {
    return factions[factionId]
}

  