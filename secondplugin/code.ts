
figma.showUI(__html__,{width:320,height:640,title:"Color Tint Generator"})


//Message received 
figma.ui.onmessage=msg=>{
  if (msg.type ==="actionGenerate"){
    console.log(msg.formDataObj)
    //destructuring the form data object
    const {circleSize,circleSpacing,colorCode, colorName, frameDirection,tintNumber}=msg.formDataObj
    //create the frame and name it 
    const parentFrame = figma.createFrame()
    parentFrame.name='Tints for the ' + colorName+' color'

    //add auto layout to the frame and set the direction, padding, spacing and the sizing mode 
    parentFrame.layoutMode=frameDirection.toUpperCase()
    parentFrame.paddingLeft=64
    parentFrame.paddingRight=64
    parentFrame.paddingBottom=64
    parentFrame.paddingTop=64
    parentFrame.itemSpacing = parseInt(circleSpacing)

    parentFrame.primaryAxisSizingMode='AUTO'
    parentFrame.counterAxisSizingMode='AUTO'

    //generate the tints as ellipses
    for (let i=0; i<tintNumber;i++){
      const tintNode = figma.createEllipse()
      //name the layer 
      tintNode.name=colorName+'.'+(100-i*10)
      //size the layer 
      tintNode.resize(parseInt(circleSize),parseInt(circleSize))


      const hexToRgb= (hexval)=>{
        let result =/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexval)
        return result ? {
          r:parseInt(result[1],16),
          g:parseInt(result[2],16),
          b:parseInt(result[3],16)
        } : null
      }

      const colorR=hexToRgb(colorCode).r/255
      const colorG=hexToRgb(colorCode).g/255
      const colorB=hexToRgb(colorCode).b/255
      console.log(colorR,colorG,colorB)

      //coloring the layer 
      tintNode.fills=[{type:'SOLID',color:{r:colorR,g:colorG,b:colorB}}]

      //setting the layer opacity 
      tintNode.opacity=(100-i*10)/100

      //add the generated nodes to the parent frame 
      parentFrame.appendChild(tintNode)

      //select and zoom to the generated frame 
      const selectFrame:FrameNode[]=[]
      selectFrame.push(parentFrame)
      figma.currentPage.selection=selectFrame
      //scroll and zoom into the view 
      figma.viewport.scrollAndZoomIntoView(selectFrame)


    }

  }
}