const R = require('ramda')

const avenues = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth',
  'Eleventh',
  'Twelfth',
  'Thirteenth',
  'Fourteenth'
]

function avenue (s) {
  const lowerCaseAvenues = avenues.map((str) => str.toLowerCase())

  if (R.contains(s, lowerCaseAvenues)) {
    return `${s} Avenue`
  }

  // Check for strings like 'Avenue 8'
  const aveN = s.match(/Avenue (\d+)/i)
  if (aveN) {
    const ave = parseInt(aveN[1])
    return `${avenues[ave - 1]} Avenue`
  }

  return s
}

const notStreets = [
  'Avenue',
  'Street',
  'Alley',
  'Broadway',
  'Bowery',
  'Market',
  'Place',
  'Court',
  'Square',
  'Lane',
  'Exchange',
  'Slip',
  'Terrace',
  'Exchange'
]

function street (s) {
  if (!s.length) {
    return s
  }

  if (R.any(R.contains(R.__, s.toLowerCase()), notStreets.map((str) => str.toLowerCase()))) {
    return s
  }

  return `${s} Street`
}

const fixes = [
  [/^Ave?\.? /i, 'Avenue '],
  [/ Ave?\.?$/i, ' Avenue'],
  [/ Ct\.?$/i, ' Court'],
  [/ Ex\.?$/i, ' Exchange'],
  [/ La\.?$/i, ' Lane'],
  [/ Mkt\.?$/i, ' Market'],
  [/ Pl\.?$/i, ' Place'],
  [/ Sl\.?$/i, ' Slip'],
  [/ St\.?$/i, ' Street'],
  [/ Sq\.?$/i, ' Square'],
  [/ Ter\.?$/i, ' Terrace'],

  // North, east, south, west:
  [/^E\.? /i, 'East '],
  [/^W\.? /i, 'West '],
  [/^N\.? /i, 'North '],
  [/^S\.? /i, 'South '],

  // Common abbreviations:
  [/Anth'y/i, 'Anthony'],
  [/Att'y/i, 'Attorney'],
  [/B'dway/i, 'Broadway'],
  [/B'man/i, 'Beckman'],
  [/Blckr\./i, 'Bleecker'],
  [/B'ry/i, 'Bowery'],
  [/B'way/i, 'Broadway'],
  [/Bd'way/i, 'Broadway'],
  [/Bow'ery/i, 'Bowery'],
  [/Bow'y/i, 'Bowery'],
  [/Br'dway/i, 'Broadway'],
  [/Chat'm/i, 'Chatham'],
  [/Cortl'dt/i, 'Corlandt'],
  [/Cortl'dt/i, 'Cortlandt'],
  [/Div'n/i, 'Division'],
  [/Div'sn/i, 'Division'],
  [/Divis'n/i, 'Division'],
  [/Eliz'beth/i, 'Elizabeth'],
  [/El'zbeth/i, 'Elizabeth'],
  [/Exch'nge/i, 'Exchange'],
  [/Fult'n/i, 'Fulton'],
  [/G'wich/i, 'Greenwich'],
  [/G'wich/i, 'Greenwich'],
  [/Gr'nwich/i, 'Greenwich'],
  [/Gr'wich/i, 'Greenwich'],
  [/Green'ch/i, 'Greenwich'],
  [/Greenw'h/i, 'Greenwich'],
  [/Lib'ty/i, 'Liberty'],
  [/Lex'ton/i, 'Lexington'],
  [/M'kt/i, 'Market'],
  [/M'lberry/i, 'Mulberry'],
  [/Mulb'ry/i, 'Mulberry'],
  [/Mulb'y/i, 'Mulberry'],
  [/Mur'y/i, 'Murray'],
  [/Orch'd/i, 'Orchard'],
  [/Riv'ton/i, 'rivington'],
  [/Wash'gton/i, 'Washington'],
  [/Wash'n/i, 'Washington'],
  [/Wash'ton/i, 'Washington'],
  [/Washingt'n/i, 'Washington'],
  [/Wav'ley/i, 'Waverly'],
  [/Will'm/i, 'William'],

  // Scottish names,  camel cased:
  [/Macdougal/i, 'MacDougal']
]

function fix (s) {
  fixes.forEach((f) => {
    s = s.replace(f[0], f[1])
  })
  return s
}

function capitalize (s) {
  return s.split(' ')
    .map((word) => word.replace(/^\w/, (l) => l.toUpperCase()))
    .join(' ')
}

const functions = [
  R.toLower,
  R.trim,
  fix,
  avenue,
  street,
  capitalize
]

const normalize = R.reduce((v, f) => f(v), R.__, functions)
module.exports = normalize

if (require.main === module) {
  process.argv.slice(2).forEach((input) => {
    console.log(normalize(input))
  })
}
