let selectedFlavors = [];
var innerRadii = [20, 50, 95, 140];
var outerRadii = [50, 95, 140, 180];
var ringnr = 4;
var steps = 62;
var circlex = 230;
var circley = 230;

//gedraginstellingen
var parentSliceAutoSelect = true;		//hogere smaak gaat mee omhoog
var childSliceAutoDeselect = true;   //subsmaak gaat mee omlaag
var slowness = 1; //traagheid bij animatie opbouw wiel

var wheelSVG = document.getElementById("svgC");

/*hier gaan we voor elke ring twee groepen maken
even getallen voor onaangeklikten en oneven voor aangeklikten (met schaduw)
bij klikken springt een stukje van de Ã©Ã©n naar de ander.
door de volgorde van de groepen, valt schaduw alleen op een grotere ring	*/
for (let i = (ringnr * 2); i > 0; i--) {
    const id = "g" + (i);
    const newGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    newGroup.setAttribute("id", (id));
    //alle oneven groepen krijgen schaduw en verschuiving.
    if (i % 2 > 0) {
        newGroup.setAttribute('transform', "scale(1.03), translate(-8,-8)");
        newGroup.setAttribute("filter", "url(#dropshadow)");
    }
    wheelSVG.appendChild(newGroup);
}
var SVGBackup = wheelSVG.innerHTML; //backup maken om snel het wiel te wissen
var flavorList =
    [
        { ring: 1, fromStep: 0, toStep: 28, color: "#F6F472", name: "Finish", id: 46, parentID: 0 },
        { ring: 2, fromStep: 0, toStep: 12, color: "#725244", name: "Mineral", id: 225, parentID: 46 },
        { ring: 3, fromStep: 0, toStep: 4, color: "#41382A", name: "Organic", id: 1573, parentID: 225 },
        { ring: 4, fromStep: 0, toStep: 1, color: "#A8AA67", name: "Musky", id: 10001, parentID: 1573 },
        { ring: 4, fromStep: 1, toStep: 2, color: "#A8AA67", name: "Woody", id: 10002, parentID: 1573 },
        { ring: 4, fromStep: 2, toStep: 3, color: "#A8AA67", name: "Earthy", id: 10003, parentID: 1573 },
        { ring: 4, fromStep: 3, toStep: 4, color: "#A8AA67", name: "Brackish", id: 10004, parentID: 1573 },
        { ring: 3, fromStep: 4, toStep: 8, color: "#EEE2DF", name: "Stone", id: 1574, parentID: 225 },
        { ring: 4, fromStep: 4, toStep: 5, color: "#A7B2B3", name: "Limestone", id: 10005, parentID: 1574 },
        { ring: 4, fromStep: 5, toStep: 6, color: "#A7B2B3", name: "Granite", id: 10006, parentID: 1574 },
        { ring: 4, fromStep: 6, toStep: 7, color: "#A7B2B3", name: "Slate", id: 10007, parentID: 1574 },
        { ring: 4, fromStep: 7, toStep: 8, color: "#A7B2B3", name: "Flint", id: 10008, parentID: 1574 },
        { ring: 3, fromStep: 8, toStep: 12, color: "#BFAD96", name: "Metal", id: 1575, parentID: 225 },
        { ring: 4, fromStep: 8, toStep: 9, color: "#A197A0", name: "Rust", id: 10009, parentID: 1575 },
        { ring: 4, fromStep: 9, toStep: 10, color: "#A197A0", name: "Aluminium", id: 10010, parentID: 1575 },
        { ring: 4, fromStep: 10, toStep: 11, color: "#A197A0", name: "Copper", id: 10011, parentID: 1575 },
        { ring: 4, fromStep: 11, toStep: 12, color: "#A197A0", name: "Iron", id: 10012, parentID: 1575 },
        { ring: 2, fromStep: 12, toStep: 28, color: "#83BF31", name: "Vegetal", id: 226, parentID: 46 },
        { ring: 3, fromStep: 12, toStep: 18, color: "#6CBB6B", name: "Green", id: 1576, parentID: 226 },
        { ring: 4, fromStep: 12, toStep: 13, color: "#C0DD8F", name: "Lettuce", id: 10013, parentID: 1576 },
        { ring: 4, fromStep: 13, toStep: 14, color: "#C0DD8F", name: "Watercress", id: 10014, parentID: 1576 },
        { ring: 4, fromStep: 14, toStep: 15, color: "#C0DD8F", name: "Spinach", id: 10015, parentID: 1576 },
        { ring: 4, fromStep: 15, toStep: 16, color: "#C0DD8F", name: "Grass", id: 10016, parentID: 1576 },
        { ring: 4, fromStep: 16, toStep: 17, color: "#C0DD8F", name: "Moss", id: 10017, parentID: 1576 },
        { ring: 4, fromStep: 17, toStep: 18, color: "#C0DD8F", name: "Seaweed", id: 10018, parentID: 1576 },
        { ring: 3, fromStep: 18, toStep: 24, color: "#FCB114", name: "Fruit", id: 1577, parentID: 226 },
        { ring: 4, fromStep: 18, toStep: 19, color: "#E7E638", name: "Citrus", id: 10019, parentID: 1577 },
        { ring: 4, fromStep: 19, toStep: 20, color: "#E7E638", name: "Rind", id: 10020, parentID: 1577 },
        { ring: 4, fromStep: 20, toStep: 21, color: "#E7E638", name: "Honeydew", id: 10021, parentID: 1577 },
        { ring: 4, fromStep: 21, toStep: 22, color: "#E7E638", name: "Cantaloupe", id: 10022, parentID: 1577 },
        { ring: 4, fromStep: 22, toStep: 23, color: "#E7E638", name: "Watermelon", id: 10023, parentID: 1577 },
        { ring: 4, fromStep: 23, toStep: 24, color: "#E7E638", name: "Cucumber", id: 10024, parentID: 1577 },
        { ring: 3, fromStep: 24, toStep: 28, color: "#7C6424", name: "Savory", id: 1578, parentID: 226 },
        { ring: 4, fromStep: 24, toStep: 25, color: "#677E2C", name: "Smoke", id: 10025, parentID: 1578 },
        { ring: 4, fromStep: 25, toStep: 26, color: "#677E2C", name: "Mushroom", id: 10026, parentID: 1578 },
        { ring: 4, fromStep: 26, toStep: 27, color: "#677E2C", name: "Olive", id: 10027, parentID: 1578 },
        { ring: 4, fromStep: 27, toStep: 28, color: "#677E2C", name: "Butter", id: 10028, parentID: 1578 },
        { ring: 1, fromStep: 28, toStep: 52, color: "#E95F6D", name: "Texture", id: 47, parentID: 0 },
        { ring: 2, fromStep: 28, toStep: 32, color: "#97181B", name: "Tough", id: 227, parentID: 47 },
        { ring: 3, fromStep: 28, toStep: 29, color: "#D8553C", name: "Chewy", id: 1579, parentID: 227 },
        { ring: 3, fromStep: 29, toStep: 30, color: "#D8553C", name: "Snappy", id: 1580, parentID: 227 },
        { ring: 3, fromStep: 30, toStep: 31, color: "#D8553C", name: "Dry", id: 1581, parentID: 227 },
        { ring: 3, fromStep: 31, toStep: 32, color: "#D8553C", name: "Squeaky", id: 1582, parentID: 227 },
        { ring: 2, fromStep: 32, toStep: 36, color: "#E62942", name: "Tender", id: 228, parentID: 47 },
        { ring: 3, fromStep: 32, toStep: 33, color: "#CE2839", name: "Meaty", id: 1583, parentID: 228 },
        { ring: 3, fromStep: 33, toStep: 34, color: "#CE2839", name: "Springy", id: 1584, parentID: 228 },
        { ring: 3, fromStep: 34, toStep: 35, color: "#CE2839", name: "Bursting", id: 1585, parentID: 228 },
        { ring: 3, fromStep: 35, toStep: 36, color: "#CE2839", name: "Toothsome", id: 1586, parentID: 228 },
        { ring: 2, fromStep: 36, toStep: 41, color: "#EA544F", name: "Fatty", id: 229, parentID: 47 },
        { ring: 3, fromStep: 36, toStep: 37, color: "#EC6C7E", name: "Buttery", id: 1587, parentID: 229 },
        { ring: 3, fromStep: 37, toStep: 38, color: "#EC6C7E", name: "Silky", id: 1588, parentID: 229 },
        { ring: 3, fromStep: 38, toStep: 39, color: "#EC6C7E", name: "Smooth", id: 1589, parentID: 229 },
        { ring: 3, fromStep: 39, toStep: 40, color: "#EC6C7E", name: "Slippery", id: 1590, parentID: 229 },
        { ring: 3, fromStep: 40, toStep: 41, color: "#EC6C7E", name: "Oily", id: 1591, parentID: 229 },
        { ring: 2, fromStep: 41, toStep: 45, color: "#F69158", name: "Thin", id: 230, parentID: 47 },
        { ring: 3, fromStep: 41, toStep: 42, color: "#E79587", name: "Soft", id: 1592, parentID: 230 },
        { ring: 3, fromStep: 42, toStep: 43, color: "#E79587", name: "Spawny", id: 1593, parentID: 230 },
        { ring: 3, fromStep: 43, toStep: 44, color: "#E79587", name: "Watery", id: 1594, parentID: 230 },
        { ring: 3, fromStep: 44, toStep: 45, color: "#E79587", name: "Weak", id: 1595, parentID: 230 },
        { ring: 2, fromStep: 45, toStep: 52, color: "#FACEAC", name: "Clean", id: 231, parentID: 47 },
        { ring: 3, fromStep: 45, toStep: 46, color: "#FBB953", name: "Clean", id: 1596, parentID: 231 },
        { ring: 3, fromStep: 46, toStep: 47, color: "#FBB953", name: "Soapy", id: 1597, parentID: 231 },
        { ring: 3, fromStep: 47, toStep: 48, color: "#FBB953", name: "Silt", id: 1598, parentID: 231 },
        { ring: 3, fromStep: 48, toStep: 49, color: "#FBB953", name: "Muddy", id: 1599, parentID: 231 },
        { ring: 3, fromStep: 49, toStep: 50, color: "#FBB953", name: "Murky", id: 1600, parentID: 231 },
        { ring: 3, fromStep: 50, toStep: 51, color: "#FBB953", name: "Sandy", id: 1601, parentID: 231 },
        { ring: 3, fromStep: 51, toStep: 52, color: "#FBB953", name: "Gritty", id: 1602, parentID: 231 },
        { ring: 1, fromStep: 52, toStep: 62, color: "#140E3A", name: "Taste", id: 48, parentID: 0 },
        { ring: 2, fromStep: 52, toStep: 54, color: "#153790", name: "", id: 232, parentID: 48 },
        { ring: 3, fromStep: 52, toStep: 54, color: "#153790", name: "Sweet", id: 1603, parentID: 232 },
        { ring: 2, fromStep: 54, toStep: 56, color: "#6C81B9", name: "", id: 233, parentID: 48 },
        { ring: 3, fromStep: 54, toStep: 56, color: "#6C81B9", name: "Sour", id: 1604, parentID: 233 },
        { ring: 2, fromStep: 56, toStep: 58, color: "#E5C1C1", name: "", id: 234, parentID: 48 },
        { ring: 3, fromStep: 56, toStep: 58, color: "#E5C1C1", name: "Salt", id: 1605, parentID: 234 },
        { ring: 2, fromStep: 58, toStep: 60, color: "#A95686", name: "", id: 235, parentID: 48 },
        { ring: 3, fromStep: 58, toStep: 60, color: "#A95686", name: "Bitter", id: 1606, parentID: 235 },
        { ring: 2, fromStep: 60, toStep: 62, color: "#530C42", name: "", id: 236, parentID: 48 },
        { ring: 3, fromStep: 60, toStep: 62, color: "#530C42", name: "Umami", id: 1607, parentID: 236 },
    ];

//Teken het wiel, door voor elke flavor drawSlice() aan te roepen.
const drawWheel = () => flavorList.map(flavor => drawSlice(flavor));

//Teken de slice
var drawSlice = ({ ring, fromStep, toStep, color, name, id }) => {
    //benoem in Ã©Ã©n keer 6 variabelen, uit de flavor te halen
    //name = name.toUpperCase();

    //Straal en hoeken bepalen.
    var innerRadius = innerRadii[ring - 1];			//straal van binnenste boog
    var outerRadius = outerRadii[ring - 1];			//straal van buitenste boog
    var Angle1 = (fromStep / steps) * 2 * Math.PI;	//hoek waar de slice begint
    var Angle2 = (toStep / steps) * 2 * Math.PI;		//hoek waar de slice eindigt

    //Elke slice heeft 4 punten/hoeken, dus 4 x,y coordinaten.
    var x1 = (circlex + (Math.sin(Angle1) * innerRadius));
    var y1 = (circley - (Math.cos(Angle1) * innerRadius));
    var x2 = (circlex + (Math.sin(Angle1) * outerRadius));
    var y2 = (circley - (Math.cos(Angle1) * outerRadius));
    var x3 = (circlex + (Math.sin(Angle2) * outerRadius));
    var y3 = (circley - (Math.cos(Angle2) * outerRadius));
    var x4 = (circlex + (Math.sin(Angle2) * innerRadius));
    var y4 = (circley - (Math.cos(Angle2) * innerRadius));

    //DE SVGCODE VOOR HET TEKENEN
    //1. ga naar punt 1 - M=move
    //2. trek vanaf daar een rechte lijn naar punt 2 - L=line
    //3. teken vanaf daar een grote boog naar punt 3 - A=arch
    //4. teken vanaf daar een rechte lijn naar punt 4 - L
    //5. teken vanaf daar een kleine boog terug naar punt 1 - A
    var pathString =
        "M" + x1 + " " + y1 +																						//1
        "L " + x2 + " " + y2 +																								//2
        "A" + outerRadius + " " + outerRadius + " 1 0 1 " + x3 + " " + y3 +	//3
        "L" + x4 + " " + y4 +																									//4
        "A" + innerRadius + " " + innerRadius + " 0 0 0 " + x1 + " " + y1;	//5

    //hier wordt het tekeningetje van de slice in elkaar gezet
    var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    newPath.setAttribute("d", pathString);

    //HET MAKEN EN PLAATSEN VAN DE TEKST VAN DE NAMEN.
    //de tekst voor in de ringen word in verschillende stapppen gemaakt:
    //1. maak een elemeent met de text van de flavor
    var newText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    //2. zet de x en de y eerst het in het midden van het wiel
    newText.setAttribute("x", circlex);
    newText.setAttribute("y", circley);

    newText.setAttribute("alignment-baseline", "middle");

    //3. bepaal de hoek van de tekst
    //er wordt (ongeveer) 90 graden vanaf getrokken, omdat de tekst
    //natuurlijk eerst horizontaal staat, dus al 90 graden gedraaid.
    var angle = (((fromStep + toStep) / steps) * 180) - 90;
    let textAngle = angle;
    //4. kleine correctie voor de tekst die voorbij het onderste punt komt.
    if (angle > 90) {
        textAngle = angle - (0.2);
    }

    //5. Bepaal hoever de teks van het midden moet staan.

    //6. maak een string waarin de transformaties uit de vorige stappen staan
    var transformString = "rotate(" + textAngle + " " + circlex + " " + circley + "),";
    //transformString += "translate("+textX+")";
    //7. in de binnenste ring moet de tekst dwars staan, dus meer berekenigen
    if (ring == 1) {
        //8. verder van het midden af
        let textX = ((innerRadius + outerRadius) / 1.82)
        let textXCorrection = 0;
        transformString += "translate(" + textX + ")";

        //9. in de onderste helft moet alles een kwartslag terug
        if (angle > 0 && angle < 180) {
            transformString += "rotate(-90 " + circlex + " " + circley + ")";
            textXCorrection = -5.5
        }
        //10. in de bovenste helft moet alles een kwartslag verder
        if (angle > 180 || angle < 0) {
            transformString += "rotate(90 " + circlex + " " + circley + ")";
            //	transformString += "translate(1)";
        }
        //11. de tekst moet in het midden worden uitgelijnd.
        newText.setAttribute("text-anchor", "middle");
        //12. Kijk of er een "/" in de naam staat.
        let division = name.indexOf("/");
        if (division == -1) {
            newText.innerHTML = name;
        }
        //13. Zo ja, breek hem af.
        else {
            let namepart1 = name.substring(0, division + 1);
            let namepart2 = name.substring(division + 1, name.length);
            //14. Zet eerst het eerste deel neer
            let newSpan1 = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
            newSpan1.innerHTML = namepart1;
            newSpan1.setAttribute("x", circlex);
            newSpan1.setAttribute("dy", textXCorrection);
            newText.appendChild(newSpan1);
            //newText.innerHTML = namepart1;
            //15. maak dan een apart vakje onder het eerste deel voor het tweede.
            let newSpan2 = document.createElementNS("http://www.w3.org/2000/svg", 'tspan');
            newSpan2.innerHTML = namepart2;
            newSpan2.setAttribute("x", circlex);
            newSpan2.setAttribute("dy", "6");
            newText.appendChild(newSpan2);
        }
    }
    //15. in andere ringen moet sommige tekst ook rechtopgedraaid worden
    else {
        let textX = outerRadius - 3
        transformString += "translate(" + textX + ")";
        //16. voorbij het onderste punt? dan op zijn kop zetten en
        //rechts uitlijnen in plaat van links
        if (angle > 90) {
            //newText.setAttribute("text-anchor", "start");
            let textX = outerRadius - 5

            transformString += "rotate(180 " + circlex + " " + circley + ")";
        }
        else {
            newText.setAttribute("text-anchor", "end");

        }
        newText.innerHTML = name;
    }

    //17. de transformatie toepassen. Lijndikte en kleur bepalen.
    newText.setAttribute('transform', transformString);

    newText.style.strokeWidth = "0px"; // geen lijn om tekst
    let lineAndTextColor = "white";
    if (isColorLight(color)) {
        lineAndTextColor = "black";
        newText.style.strokeWidth = "0.3px";
    }
    newText.style.fill = lineAndTextColor;
    newText.style.stroke = lineAndTextColor;

    //18. de Slice maken: maak de nieuwe groep aan met de id van de flavor
    var newGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    newGroup.setAttribute("id", ("" + id));
    newGroup.setAttribute("class", "slice");
    newGroup.setAttribute("onclick", "clickAction(this)");
    newGroup.style.stroke = "white";
    newGroup.style.fill = color;
    newPath.style.strokeWidth = "1px";
    //19. zet de tekening en de tekst in deze groep
    newGroup.appendChild(newPath);
    newGroup.appendChild(newText);

    //20. Zet die groep vervolgens in de juiste ringgroep.
    var parentGroupID = ("g" + (ring * 2));
    document.getElementById(parentGroupID).appendChild(newGroup);
};


//Bepaal of een kleur licht is (zodat witte letters er niet op te lezen zijn)
//naar voorbeeld: https://awik.io/determine-color-bright-dark-using-javascript/
const isColorLight = (color) => {
    let r = parseInt(color.substring(1, 3), 16);
    let g = parseInt(color.substring(3, 5), 16);
    let b = parseInt(color.substring(5, 7), 16);
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );
    return (hsp > 210);
}

//Klikactie voor een slice: moet ie geselecteerd worden of geDEselecteerd?
const clickAction = (slice) => {
    (isSelected(slice)) ? deselectSlice(slice) : selectSlice(slice);
    //document.getElementById("userNotes").innerText = getSelectedFlavorString();
    document.getElementById("flavors").value = (getSelectedFlavorString());
    document.getElementById("flavorsOyster").value = (getSelectedFlavorIds());
}

//selecteren van een slice = in een group plaatsen met hoger nummer
const selectSlice = (slice) => {
    if (!isSelected(slice)) {
        document.getElementById(getHigherGroupId(slice)).appendChild(slice);
        selectedFlavors.push(getFlavor(slice));
        //Heeft ie een parent? en staat de optie op true, dan ook selecteren:
        if (getGroupNumber(slice) > 2 && parentSliceAutoSelect) {
            selectSlice(getParentSlice(slice));
        }
    }
}

//Deselecteren van een slice = in een group plaatsen met lager nummer
const deselectSlice = (slice) => {
    document.getElementById(getLowerGroupId(slice)).appendChild(slice);
    deselectFlavor(getFlavor(slice));
    //staat de optie aan om children ook te Deselecteren, doe die dan ook.
    if (childSliceAutoDeselect) {
        getSelectedChildrenSlices(slice).map((ChildSlice) => deselectSlice(ChildSlice));
    }
}

//backup HTML in SVG terugzetten = leegmaken en dan opnieuw tekenen
const resetWheel = () => {
    wheelSVG.innerHTML = SVGBackup;
    drawWheel();
}

//het nummer van de groep. Ze heten "g1", "g2", etc, dus hak de "g" eraf.
const getGroupNumber = (slice) => parseInt((slice.parentNode.id).replace("g", ""));

//Het id van een groep hoger. g2=g1, etc
const getHigherGroupId = (slice) => `g${getGroupNumber(slice) - 1}`;

//Het id van een groep lager. g1=g2, etc
const getLowerGroupId = (slice) => `g${getGroupNumber(slice) + 1}`;

//is deze geselecteerd? dat ziet ie door een oneven groepnummer
const isSelected = (slice) => getGroupNumber(slice) % 2 > 0;

//zoekt in flavorList naar ID van de parentSlice
const getParentSliceID = (sliceID) => {
    return (flavorList.find((listpart) =>
        listpart.id == sliceID
    ).parentID);
}

//Zoek het daadwerkelijke element van de parent.
const getParentSlice = (slice) => document.getElementById(getParentSliceID(slice.id));

//haal flavor uit lijst met geselecteerde flavors
const deselectFlavor = (deselectedFlavor) => {
    selectedFlavors = selectedFlavors.filter((flavor) => flavor != deselectedFlavor);
}

//geef flavor van een slice
const getFlavor = (slice) => {
    return (flavorList.find((flavor) => flavor.id == slice.id));
}

//geef de ID-nummers van de geselecteerde flavors
const getSelectedFlavorIds = () => {
    return (selectedFlavors.map((flavor) => flavor.id));
}

//geef de parentID-nummers van de geselecteerde flavors
const getSelectedFlavorParentIds = () => {
    return (selectedFlavors.map((flavor) => flavor.parentID));
}

//geef de namen van de geselecteerde flavors
const getSelectedFlavorNames = () => {
    return (selectedFlavors.map((flavor) => flavor.name));
}

//Geef de parentflavor
const getParentFlavor = (childFlavor) => {
    return flavorList.find((flavor) => flavor.id == childFlavor.parentID);
}

//geef geselecteerde "babies" = flavors met op dit moment geen geselecteerde children
const getSelectedFlavorBabies = () => {
    return (selectedFlavors.filter((flavor) => !(getSelectedFlavorParentIds().includes(flavor.id))));
}

//geef een string met alle namen van geselecteerde flavors
//wordt misschein later gebruikt om ergens in het formulier te laten zien.
const getSelectedFlavorString = () => {
    let result = "";
    getSelectedFlavorBabies().map((flavor) => {
        (result == "") ? result += flavor.name : result += ", " + flavor.name;
        // document.getElementById("flavors").name = (getSelectedFlavorString());
    });
    return result;
}


//Geeft voor een gegeven flavor een string met zijn voorouders
//in "familieopmaak", bijvoorbeeld voor berry 'Fruity->Berry'
const getFlavorFamily = (flavor) => {
    let result = flavor.name;
    if (flavor.parentID != '0') {
        let temp = result;
        result = getFlavorFamily(getParentFlavor(flavor)) + "->" + temp;
    }
    return result;
}

//geef een string met alle namen van geselecteerde flavors in "familieopmaak"
//wordt misschein later gebruikt om ergens in het formulier te laten zien.
const getSelectedFlavorStringLong = () => {
    return getSelectedFlavorBabies().map((flavor) => getFlavorFamily(flavor));
}

//Onderstaande functie krijgt een slice mee en geeft een lijst terug met
//de children van deze slice die geselecteerd zijn. Dat gaat zo:
//1. neem de flavorList en filter daar alleen de flavors uit die
//onder deze vallen (ParentID == sliceid).
//2. neem daarvan niet de hele flavor, maar de id
//3. zoek de daadwerkelijke elementen met die id.
//4. filter alleen de elementen die geselecteerd zijn.
const getSelectedChildrenSlices = (slice) => {
    return flavorList.filter((flavor) => flavor.parentID == slice.id) 	//1
        .map((flavor) => flavor.id)										//2
        .map((id) => document.getElementById(id))					//3
        .filter((element) => isSelected(element));				//4
};

drawWheel();

// resetWheel();
