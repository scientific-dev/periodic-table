export const SERIES_COLORS = {
    'alkali metal': '#6c3b01',
    'alkaline earth metal': '#846011',
    'lanthanide': '#402c17',
    'actinide': '#732e4c',
    'post-transition metal': '#003666',
    'transition metal': '#711019',
    'noble gas': '#3a2151',
    'metalloid': '#015146',
    'polyatomic nonmetal': '#3e6418',
    'diatomic nonmetal': '#629e26',
    'unknown': '#545454'
}

export const STATE_COLORS = {
    'solid': 'white',
    'liquid': '#7db7ff',
    'gas': '#ff8880',
    'unknown': '#d4d4d4'
}

export const STATE_COLORS_REV = Object.fromEntries(Object.entries(STATE_COLORS).map(x => x.reverse()));

export const METALS = [
    'alkali metal',
    'alkaline earth metal',
    'lanthanide',
    'actinide',
    'transition metal',
    'post-transition metal'
];

export const NON_METALS = [
    'polyatomic nonmetal',
    'diatomic nonmetal',
    'noble gas'
];

export const PROPS = {
    n: 'Atomic Number',
    apprnc: 'Appearance',
    ctg: 'Category',
    clr: 'Color',
    sym: 'Symbol',
    am: 'Atomic Mass',
    by: 'Discovered By',
    nby: 'Named by',
    d: 'Density',
    b: 'Boiling Point',
    m: 'Melting Point',
    mh: 'Molar Heat',
    p: 'Period',
    phase: 'Phase',
    shls: 'Shells',
    ec: 'Electronic Configuration',
    ecs: 'Electronic Configuration Semantic',
    ea: 'Electronic Affinity',
    ie: 'Ionization Energies',
    ep: 'Electronegativity Pauling'
}

export const DULL_HEX = '#545454';

export const formatTempValue = x => x ? `${x}K (${parseFloat((x - 273).toFixed(2))}°C) ` : 'No Data Available'

export const PROPS_FORMATTER = {
    shls: x => x?.join(', ') || 'No Data Available',
    b: formatTempValue,
    m: formatTempValue,
    d: x => x ? `${x} kg/m³` : 'No Data Available',
    c: x => x || 'No Color',
    ie: x => x?.join(', ') || 'No Data Available'
}

export function formatPropValue (id, value) {
    return PROPS_FORMATTER[id] ? PROPS_FORMATTER[id](value) : (value || 'No Data Available');
}