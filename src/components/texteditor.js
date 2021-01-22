import React, {Component} from 'react'; 
// Importing Module 
import {Editor, EditorState , RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './texteditor.css';
import {
  convertToRaw,
} from 'draft-js';
import { stateToHTML } from "draft-js-export-html";
import { Flex,Center,Text,Box,Button,Stack,Icon} from "@chakra-ui/react";
import { GoBold,GoItalic,GoDesktopDownload } from "react-icons/go";

const  dkl = "hello";
 export default class Texteditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => {this.setState({editorState});
     var value =stateToHTML(this.state.editorState.getCurrentContent());
    this.file=this.replacer(value);
  };
 

  }
  replacer(input)
  {
 console.log(input);
 input=input.replace(/<p>/g, ' ').replace(/<\/p>/g, '</br>').replace(/<strong>/g, '**').replace(/<\/strong>/g, '**').replace(/&nbsp;/g," ");  
 
 return input;
  }
 
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    
  }
  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    
  }
  onDownload(){
   
   const hiddenElement = document.createElement('a');

   hiddenElement.href = 'data:attachment/text,' + encodeURI(this.file);
   hiddenElement.target = '_blank';
   hiddenElement.download = 'README.md';
   hiddenElement.click();
    
  }
    
    
      render() {
        return (
<div>
<Flex color="black" >
  
  <Box  flex="1" bg="tomato" border="1px" borderColor="gray.10"  p={1} m={2} >
  <Stack direction="row" spacing={1} align="center">
  <Button onClick={this._onBoldClick.bind(this)}><Icon as={GoBold} />
    </Button>
          <Button  onClick={this._onItalicClick.bind(this)}> <Icon as={GoItalic} /></Button>
          
          <Button  onClick={this.onDownload.bind(this)}><Icon as={GoDesktopDownload} /></Button>
          </Stack>
            <Box className="editors-panel">
              <Editor editorState={this.state.editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange} /></Box>
  </Box>
  <Box flex="1" bg="white" border="1px" borderColor="gray.10" p={5}>
    <Text>
       OUTPUT
    </Text>
    <Text> {this.file}</Text>
  </Box>
</Flex>
</div>

        );
    }
}