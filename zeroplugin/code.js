//Awase Khirni Syed 
// Elain Technologies Inc,Canada 2020-2021

//my first plugin development for figma


function runPlugin(){

    //get the number of selected elements 
    let selectedElements = figma.currentPage.selection

    console.log(selectedElements)

    let noOfselectedElements=figma.currentPage.selection.length
    console.log(noOfselectedElements)

    let selectedName=figma.currentPage.selection[0].name
    console.log('selectedName:'+selectedName)

    //close plugin
    figma.closePlugin()
}


runPlugin()

