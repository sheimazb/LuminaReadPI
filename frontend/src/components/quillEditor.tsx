import React, { createRef, ChangeEvent } from 'react';
import {
  Button,
  VStack,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';

// Custom Clipboard module
class Clipboard extends (Quill as any).import('modules/clipboard') {
  async onPaste(e: ClipboardEvent) {
    const clipboardData = e.clipboardData ;
    const pastedData = await clipboardData?.getData('Text');
    // your implementation here
  }
}

Quill.register('modules/clipboard', Clipboard, true);

// Custom Image Blot
const ImageBlot = Quill.import('formats/image');

class CustomImageBlot extends ImageBlot {
  static create(value: any) {
    const node = super.create(value);
    node.setAttribute('alt', value.alt);
    node.setAttribute('width', '100%');
    return node;
  }
}

Quill.register('formats/image', CustomImageBlot);

// Custom Video Blot
const VideoBlot = Quill.import('formats/video');

class CustomVideoBlot extends VideoBlot {
  static create(value: any) {
    const node = super.create(value);
    node.setAttribute('title', value.title);
    node.setAttribute('width', '100%');
    node.setAttribute('controls', '');
    return node;
  }
}

Quill.register('formats/video', CustomVideoBlot);

interface QuillEditorProps {}

class QuillEditor extends React.Component<QuillEditorProps> {
  reactQuillRef: ReactQuill | null = null;
  inputOpenImageRef: React.RefObject<HTMLInputElement> = createRef();
  inputOpenVideoRef: React.RefObject<HTMLInputElement> = createRef();
  inputOpenFileRef: React.RefObject<HTMLInputElement> = createRef();

  handleChange = (html: string) => {
    // your handleChange implementation
  };

  imageHandler = () => {
    this.inputOpenImageRef.current?.click();
  };

  videoHandler = () => {
    this.inputOpenVideoRef.current?.click();
  };

  fileHandler = () => {
    this.inputOpenFileRef.current?.click();
  };

  insertImage = (e: ChangeEvent<HTMLInputElement>) => {
    // your insertImage implementation
  };

  insertVideo = (e: ChangeEvent<HTMLInputElement>) => {
    // your insertVideo implementation
  };

  insertFile = (e: ChangeEvent<HTMLInputElement>) => {
    // your insertFile implementation
  };

  render() {
    return (
      <VStack>
        <div id="toolbar">
          {/* your toolbar buttons */}
        </div>
        <ReactQuill
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          theme="snow"
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
        <input
          type="file"
          accept="image/*"
          ref={this.inputOpenImageRef}
          style={{ display: 'none' }}
          onChange={this.insertImage}
        />
        <input
          type="file"
          accept="video/*"
          ref={this.inputOpenVideoRef}
          style={{ display: 'none' }}
          onChange={this.insertVideo}
        />
        <input
          type="file"
          accept="*"
          ref={this.inputOpenFileRef}
          style={{ display: 'none' }}
          onChange={this.insertFile}
        />
      </VStack>
    );
  }

  modules = {
    toolbar: {
      container: '#toolbar',
      handlers: {
        insertImage: this.imageHandler,
        insertVideo: this.videoHandler,
        insertFile: this.fileHandler,
      },
    },
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'image',
    'video',
    'file',
    'link',
    'code-block',
    'video',
    'blockquote',
    'clean',
  ];
}

export default QuillEditor;
