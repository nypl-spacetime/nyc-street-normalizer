const R = require('ramda')

const fullOrdinals = [
  [/First/i, '1st'],
  [/Second/i, '2nd'],
  [/Third/i, '3rd'],
  [/Fourth/i, '4th'],
  [/Fifth/i, '5th'],
  [/Sixth/i, '6th'],
  [/Seventh/i, '7th'],
  [/Eighth/i, '8th'],
  [/Ninth/i, '9th'],
  [/Tenth/i, '10th'],
  [/Eleventh/i, '11th'],
  [/Twelfth/i, '12th'],
  [/Thirteenth/i, '13th'],
  [/Fourteenth/i, '14th'],
  [/Fifteenth/i, '15th'],
  [/Sixteenth/i, '16th'],
  [/Seventeenth/i, '17th'],
  [/Eighteenth/i, '18th'],
  [/Nineteenth/i, '19th'],
  [/Twentieth/i, '20th'],
  [/Twenty-?First/i, '21st'],
  [/Twenty-?Second/i, '22nd'],
  [/Twenty-?Third/i, '23rd'],
  [/Twenty-?Fourth/i, '24th'],
  [/Twenty-?Fifth/i, '25th'],
  [/Twenty-?Sixth/i, '26th'],
  [/Twenty-?Seventh/i, '27th'],
  [/Twenty-?Eighth/i, '28th'],
  [/Twenty-?Ninth/i, '29th'],
  [/Thirtieth/i, '30th'],
  [/Thirty-?First/i, '31st'],
  [/Thirty-?Second/i, '32nd'],
  [/Thirty-?Third/i, '33rd'],
  [/Thirty-?Fourth/i, '34th'],
  [/Thirty-?Fifth/i, '35th'],
  [/Thirty-?Sixth/i, '36th'],
  [/Thirty-?Seventh/i, '37th'],
  [/Thirty-?Eighth/i, '38th'],
  [/Thirty-?Ninth/i, '39th'],
  [/Fourtieth/i, '40th'],
  [/Fourty-?First/i, '41st'],
  [/Fourty-?Second/i, '42nd'],
  [/Fourty-?Third/i, '43rd'],
  [/Fourty-?Fourth/i, '44th'],
  [/Fourty-?Fifth/i, '45th'],
  [/Fourty-?Sixth/i, '46th'],
  [/Fourty-?Seventh/i, '47th'],
  [/Fourty-?Eighth/i, '48th'],
  [/Fourty-?Ninth/i, '49th'],
  [/Fiftieth/i, '50th'],
  [/Fifty-?First/i, '51st'],
  [/Fifty-?Second/i, '52nd'],
  [/Fifty-?Third/i, '53rd'],
  [/Fifty-?Fourth/i, '54th'],
  [/Fifty-?Fifth/i, '55th'],
  [/Fifty-?Sixth/i, '56th'],
  [/Fifty-?Seventh/i, '57th'],
  [/Fifty-?Eighth/i, '58th'],
  [/Fifty-?Ninth/i, '59th']
]

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

const notStreets = [
  'Alley',
  'Avenue',
  'Broadway',
  'Boulevard',
  'Bowery',
  'Court',
  'Exchange',
  'Lane',
  'Market',
  'Place',
  'Road',
  'Row',
  'Slip',
  'Street',
  'Square',
  'Terrace',
  'Wharf'
]

const fixes = [
  [/^Ave?\.? /i, 'Avenue '],
  [/ Ave?\.?$/i, ' Avenue'],
  [/ Blvd?\.?$/i, ' Boulevard'],
  [/ Ct\.?$/i, ' Court'],
  [/ Ex\.?$/i, ' Exchange'],
  [/ La\.?$/i, ' Lane'],
  [/ Mkt\.?$/i, ' Market'],
  [/ Rd\.?$/i, ' Road'],
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

  // Sometimes, a single d is used for ordinals:
  [/2d/, '2nd'],
  [/3d/, '3rd'],

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
  [/De Kalb/i, 'DeKalb'],

  // Camel cased names:
  [/Macdougal/i, 'MacDougal'],
  [/Dekalb/i, 'DeKalb']
]

function avenue (str) {
  const lowerCaseAvenues = avenues.map((ave) => ave.toLowerCase())

  if (R.contains(str, lowerCaseAvenues)) {
    return `${str} Avenue`
  }

  // Check for strings like 'Avenue 8', convert to 'Eighth Avenue'
  const aveN = str.match(/Avenue (\d+)/i)
  if (aveN) {
    const ave = parseInt(aveN[1])
    if (avenues[ave - 1]) {
      return `${avenues[ave - 1]} Avenue`
    }
  }

  // Check for strings like '1st Avenue', convert to 'First Avenue'
  const nAve = str.match(/(\d+)\w{0,2} Avenue/i)
  if (nAve) {
    const ave = parseInt(nAve[1])
    if (avenues[ave - 1]) {
      return `${avenues[ave - 1]} Avenue`
    }
  }

  return str
}

function street (str) {
  const notStreet = notStreets
    .reduce((any, notStreet) => any || str.match(new RegExp(`\\b${notStreet}\\b`, 'i')), false)

  if (notStreet) {
    return str
  }

  return `${str} Street`
}

function ordinals (str) {
  // Keep text ordinals for Avenues
  if (str.toLowerCase().endsWith('avenue')) {
    return str
  }

  // But convert to numbers for other street/roads, etc
  //   reverse list to start with highest numbers
  return R.reverse(fullOrdinals).reduce((str, num) => str.replace(num[0], num[1]), str)
}

function check (str) {
  if (!str.length) {
    throw new Error('String is empty')
  }

  return str
}

function fix (str) {
  return fixes.reduce((str, fix) => str.replace(fix[0], fix[1]), str)
}

function capitalize (str) {
  return str.split(' ')
    .map((word) => word.replace(/^\w/, (firstChar) => firstChar.toUpperCase()))
    .join(' ')
}

const functions = [
  R.toLower,
  R.trim,
  check,
  fix,
  avenue,
  street,
  ordinals,
  capitalize
]

const normalize = R.reduce((str, func) => func(str), R.__, functions)
module.exports = normalize

if (require.main === module) {
  process.argv.slice(2).forEach((input) => {
    console.log(normalize(input))
  })
}
