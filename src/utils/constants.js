export const VALID_SERIES = [
    'alkali metal',
    'alkaline earth metal',
    'lanthanide',
    'actinide',
    'post-transition metal',
    'transition metal',
    'noble gas',
    'metalloid',
    'polyatomic nonmetal',
    'diatomic nonmetal',
    'unknown'
];

export const STATE_COLORS = {
    'solid': 'white',
    'liquid': '#a3ccff',
    'gas': '#ffa49e',
    'unknown': '#d4d4d4'
}

export const STATE_COLORS_REV = Object.fromEntries(Object.entries(STATE_COLORS).map(x => x.reverse()));
export const SERIES_CSS_CODE = Object.fromEntries(VALID_SERIES.map(x => [x, `var(--${x.replace(/ /g, '-')}-series)`]));

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

export const NUMERIC_PROPS = ['n', 'am', 'd', 'b', 'm', 'mh', 'ep'];
export const NUMERIC_VALUES = {
    n: [ 1, 119 ],
    am: [ 1.008, 315 ],
    d: [ 0, 40.7 ],
    b: [ 0, 5869 ],
    m: [ 0, 3823 ],
    mh: [ 0, 62.7 ],
    ep: [0, 3.98]
}

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
    ie: x => x?.join(', ') || 'No Data Available',
    am: x => `${x.toString()} u`
}

export function formatPropValue (id, value) {
    return PROPS_FORMATTER[id] ? PROPS_FORMATTER[id](value) : (value || 'No Data Available');
}