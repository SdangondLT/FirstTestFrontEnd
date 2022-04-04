let docs = [];
let arrayConcatenated = [];
let arrayPositionOdd = [];
let arraySorted = [];

// There is the function to get data.
async function getData() {
  return await fetch('https://api.plos.org/search?q=title:DNA')
    .then((response) => response.json())
    .then((json) => {
      docs = json.response.docs;
    });
};

async function get() {
  await getData();
  console.log("Esta es la api", docs);
  await pointOne_articleType("Research Article");
  await pointTwo_score(6.0);
  await pointThree_id("10.1371/journal.pgen.1006605");
  await pointFour_articleTypeUniques();
  await pointFive_journal();
  await pointSix_delete("publication_date");
  await pointSeven_Range();
  await pointEight_arrayAdded();
  await pointNine_arrayAdded();
  await pointNine_sortFunction(arrayPositionOdd, "title");
};

async function pointOne_articleType(value) {
    let arrayWithArticleType = docs.filter(item => item.article_type != value);
    console.log(`1. Estos son los article_type diferentes de ${value}:`, arrayWithArticleType);
};

async function pointTwo_score(grade) {
    let dataWithScoreGreaterToSix = docs.filter(item => item.score > grade);
    let dataAboutAuthorDisplay;
    dataWithScoreGreaterToSix.forEach(item => {
        dataAboutAuthorDisplay = item.author_display;
    });
    console.log(`2. Estos son los valores de author_display with Score greater than ${grade}:`, dataAboutAuthorDisplay);
};

async function pointThree_id(idParameter) {
    let dataWithId = docs.filter(item => item.id == idParameter);
    dataWithId[0].article_type = 'Newspaper';
    console.log(`3. Este es el objeto correspondiente al id-> ${idParameter} con el article_type actualizado:`, dataWithId);
};

async function pointFour_articleTypeUniques() {
    let filterArticles = docs.map(item => item.article_type);
    let articleTypeUnique = Array.from(new Set(filterArticles));
    console.log(`4. Estos son los article_type sin repetir:`, articleTypeUnique);
};

async function pointFive_journal() {
    let filterJournal = docs.map(item => item.journal);
    let journalUnique = Array.from(new Set(filterJournal));
    console.log(`5. Estos son todos los journals:`, filterJournal);
    console.log(`5.1. Estos son los journals sin repetir:`, journalUnique);
};

async function pointSix_delete(propertyToDelete) {
    docs.forEach(item => {
        delete item[propertyToDelete];
    });
    console.log(`6. Ha borrado la propiedad ${propertyToDelete}:`, docs);
};

async function pointSeven_Range() {
    let indexOfIdStart = docs.findIndex(item => item.id === "10.1371/journal.pone.0047101");   
    let indexOfIdEnd = docs.findIndex(item => item.id === "10.1371/journal.pone.0177147");//"10.1371/journal.pgen.1000047" id not found
    let onlyRange = docs.slice(indexOfIdStart, indexOfIdEnd + 1);
    console.log(`7. Estos son los objetos dentro del rango:`, onlyRange);
};

let arrayToAdd = [
    {
        "id":"10.1371/journal.pone.0177149",
        "journal":"Wall Street",
        "eissn":"1932-6203",
        "publication_date":"2017-05-03T00:00:00Z",
        "article_type":"Newspaper",
        "author_display":["Irina Bruck", "Nalini Dhingra", "Matthew P. Martinez", "Daniel L. Kaplan"],
        "abstract":["\nDpb11 is required for the initiation of DNA replication in budding yeast. We found that Dpb11 binds tightly to single-stranded DNA (ssDNA) or branched DNA structures, while its human homolog, TopBP1, binds tightly to branched-DNA structures. We also found that Dpb11 binds stably to CDK-phosphorylated RPA, the eukaryotic ssDNA binding protein, in the presence of branched DNA. A Dpb11 mutant specifically defective for DNA binding did not exhibit tight binding to RPA in the presence of DNA, suggesting that Dpb11-interaction with DNA may promote the recruitment of RPA to melted DNA. We then characterized a mutant of Dpb11 that is specifically defective in DNA binding in budding yeast cells. Expression of dpb11-m1,2,3,5,ΔC results in a substantial decrease in RPA recruitment to origins, suggesting that Dpb11 interaction with DNA may be required for RPA recruitment to origins. Expression of dpb11-m1,2,3,5,ΔC also results in diminished GINS interaction with Mcm2-7 during S phase, while Cdc45 interaction with Mcm2-7 is like wild-type. The reduced GINS interaction with Mcm2-7 may be an indirect consequence of diminished origin melting. We propose that the tight interaction between Dpb11, CDK-phosphorylated RPA, and branched-DNA may be required for the essential function of stabilizing melted origin DNA in vivo. We also propose an alternative model, wherein Dpb11-DNA interaction is required for some other function in DNA replication initiation, such as helicase activation.\n"],
        "title_display":"Dpb11 may function with RPA and DNA to initiate DNA replication",
        "score":7.018296
    },
    {
        "id":"10.1371/journal.pgen.1006699",
        "journal":"Wall Street",
        "eissn":"1553-7404",
        "publication_date":"2017-02-10T00:00:00Z",
        "article_type":"Newspaper",
        "author_display":["Concetta Cuozzo", "Antonio Porcellini", "Tiziana Angrisano", "Annalisa Morano", "Bongyong Lee", "Alba Di Pardo", "Samantha Messina", "Rodolfo Iuliano", "Alfredo Fusco", "Maria R. Santillo", "Mark T. Muller", "Lorenzo Chiariotti", "Max E. Gottesman", "Enrico V. Avvedimento"],
        "abstract":[""],
        "title_display":"Correction: DNA Damage, Homology-Directed Repair, and DNA Methylation",
        "score":7.018296
    }
];

async function pointEight_arrayAdded() {    
    arrayConcatenated = docs.concat(arrayToAdd);
    console.log(`8. Aqui puede observar los dos arrays concatenados:`, arrayConcatenated);
};

async function pointNine_arrayAdded() {    
    arrayPositionOdd = docs.filter((num, index) => index % 2 != 0);
    console.log(`9. Aqui puede observar las posiciones impares de docs:`, arrayPositionOdd);
    
    arrayPositionOdd.forEach(item => {
        item.title = item.journal +", "+ item.title_display; 
        item.authors = item.author_display.join(" - ");
    });
    console.log(`9.1. Array de impares con nuevo formato:`, arrayPositionOdd);
};

async function pointNine_sortFunction(arrayToSort, property) {  
    let valueTypeOf = arrayToSort.map(item => item[property])[0];
    if (typeof valueTypeOf == "string")
        arraySorted = arrayToSort.sort((a, b) => (a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1));
    else
        arraySorted = arrayToSort.sort((a, b) => (a[property] > b[property] ? 1 : -1));
    console.log(`9.2. Este es el array ordenado descendentemente por la propiedad ${property}:`, arraySorted);
};

get();