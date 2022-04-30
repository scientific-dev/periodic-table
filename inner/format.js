const fs = require('fs');
const elements = require('./elements.json');
const data = {};

// tungsten m 5828
// carbon 5100 3828
// ph
// arsenic

for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    data[element.name] = {
        apprnc: element.appearance,
        ctg: element.category,
        clr: element.color,
        am: element.atomic_mass,
        by: element.discovered_by,
        nby: element.named_by,
        d: element.density,
        b: element.boil,
        m: element.melt,
        mh: element.molar_heat,
        nm: element.name,
        n: element.number,
        p: element.period,
        phase: element.phase,
        src: element.source,
        img: element.spectral_img,
        des: element.summary,
        sym: element.symbol,
        cors: [element.xpos, element.ypos],
        shls: element.shells,
        ec: element.electron_configuration,
        ecs: element.electron_configuration_semantic,
        ea: element.electron_affinity,
        ie: element.ionization_energies,
        ep: element.electronegativity_pauling
    };
}

fs.writeFileSync('./public/elements.json', JSON.stringify(data));