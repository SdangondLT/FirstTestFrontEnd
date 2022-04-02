let docs = [];

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
  pointOne_articleType("Research Article");
  pointTwo_score(6.1);
  pointThree_id("10.1371/journal.pgen.1006605");
  pointFour_articleTypeUniques();
  pointFive_journal();
  pointSix_delete("publication_date");
  pointSeven_Range();
  pointEight_arrayAdded();
};

// 1.
async function pointOne_articleType(value) {
    let arrayWithArticleType = docs.filter(item => item.article_type != value);
    console.log(`1. Estos son los article_type diferentes de ${value}:`, arrayWithArticleType);
};

//2.
async function pointTwo_score(grade) {
    let dataWithScoreGreaterToSix = docs.filter(item => item.score > grade);
    console.log(`2. Estos son los valores de author_display with Score greater than ${grade - 0.1}:`, dataWithScoreGreaterToSix);
};

//3.
async function pointThree_id(idParameter) {
    let dataWithId = docs.filter(item => item.id == idParameter);
    dataWithId[0].article_type = 'Newspaper';
    console.log(`3. Este es el objeto correspondiente al id-> ${idParameter} con el article_type actualizado:`, dataWithId);
};
// async function pointThree_id(idParameter) {
//     let dataWithId = docs.map((item) => 
//     {
//         let articleType = 'Newspaper';
//         if (item.id == idParameter) {
//             item.article_type = articleType;
//         }
//         console.log(`3. Este es el objeto correspondiente al id-> ${idParameter} con el article_type actualizado:`, dataWithId);
//     });
// };

//4.
async function pointFour_articleTypeUniques() {
    let filterArticles = docs.map(item => item.article_type);
    let articleTypeUnique = Array.from(new Set(filterArticles));
    console.log(`4. Estos son los article_type sin repetir:`, articleTypeUnique);
};

//5. usar join revisar
async function pointFive_journal() {
    let filterJournal = docs.map(item => item.journal);
    let journalUnique = Array.from(new Set(filterJournal));
    console.log(`5. Estos son todos los journals:`, filterJournal);
    console.log(`5.1. Estos son los journals sin repetir:`, journalUnique);
};

//6.
async function pointSix_delete(toDelete) {

    docs.forEach(property => {
        delete property[toDelete];
    });
    
    console.log(`6. Ha borrado la propiedad ${toDelete}:`, docs);
};

//7. posicion 2 a la 6
async function pointSeven_Range() {
    let indexOfIdStart = docs.findIndex(item => item.id === "10.1371/journal.pone.0047101");   
    let indexOfIdEnd = docs.findIndex(item => item.id === "10.1371/journal.pgen.1000047");    
    let onlyRange = docs.slice(indexOfIdStart, indexOfIdEnd + 1);
    console.log(`7. Estos son los objetos dentro del rango:`, onlyRange);
};

//array to add
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

//8.
async function pointEight_arrayAdded() {    
    let newArray = docs.concat(arrayToAdd);
    console.log(`8. Aqui puede observar los dos arrays concatenados:`, newArray);
};

//9
async function pointNine_arrayAdded() {    
    let newArray = docs.concat(arrayToAdd);
    console.log(`8. Aqui puede observar los dos arrays concatenados:`, newArray);
};

get();

// Puntos a evaluar:
// ● Async
// ● Arrays
// ● Funciones
// ● Variables globales y locales