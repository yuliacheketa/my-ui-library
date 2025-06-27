import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const EditorWrapper = styled.div<{ darkMode: boolean }>`
  border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#ddd')};
  border-radius: 12px;
  padding: 1rem;
  max-width: 700px;
  margin: 2rem auto;
  background: ${({ darkMode }) => (darkMode ? '#1e1e1e' : '#fff')};
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: ${({ darkMode }) => (darkMode ? '#eee' : '#222')};
`;

const Toolbar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ active?: boolean; darkMode?: boolean }>`
  background: ${({ active, darkMode }) =>
    active
      ? '#5b6ef9'
      : darkMode
      ? '#2f2f2f'
      : '#f0f0f3'};
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  color: ${({ active, darkMode }) =>
    active ? '#fff' : darkMode ? '#ddd' : '#444'};
  box-shadow: ${({ active, darkMode }) =>
    active
      ? '0 4px 8px rgba(91,110,249,0.5)'
      : darkMode
      ? 'inset 2px 2px 4px #1a1a1a, inset -2px -2px 4px #3a3a3a'
      : 'inset 2px 2px 5px #d1d9ff, inset -5px -5px 12px #ffffff'};
  transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: #5b6ef9;
    color: white;
    box-shadow: 0 6px 12px rgba(91,110,249,0.6);
  }

  &:focus {
    outline: none;
  }
`;

const EditableArea = styled.div<{ darkMode: boolean }>`
  min-height: 180px;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ darkMode }) => (darkMode ? '#444' : '#ddd')};
  background: ${({ darkMode }) => (darkMode ? '#2a2a2a' : '#fff')};
  box-shadow: inset 5px 5px 10px ${({ darkMode }) => (darkMode ? '#1a1a1a' : '#f0f0f3')},
              inset -5px -5px 10px ${({ darkMode }) => (darkMode ? '#333' : '#ffffff')};
  font-size: 17px;
  color: ${({ darkMode }) => (darkMode ? '#eee' : '#222')};
  line-height: 1.6;
  overflow-y: auto;

  &:focus {
    outline: none;
    border-color: #5b6ef9;
    box-shadow: 0 0 8px rgba(91,110,249,0.7);
  }

  b, strong {
    font-weight: 700;
  }

  i, em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  s, strike {
    text-decoration: line-through;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  blockquote {
    border-left: 4px solid #5b6ef9;
    margin-left: 0;
    margin-right: 0;
    padding-left: 1rem;
    color: ${({ darkMode }) => (darkMode ? '#aaa' : '#555')};
    font-style: italic;
    background: ${({ darkMode }) => (darkMode ? '#333' : '#f5f7ff')};
    border-radius: 6px;
  }

  a {
    color: #5b6ef9;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const RichTextEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>('');
  const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({});
  const [darkMode, setDarkMode] = useState(false);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateActiveFormats();
    setContent(editorRef.current?.innerHTML || '');
  };

  const updateActiveFormats = () => {
    const commands = ['bold', 'italic', 'underline', 'strikeThrough', 'insertOrderedList', 'insertUnorderedList'];
    const newActive: { [key: string]: boolean } = {};
    commands.forEach(cmd => {
      newActive[cmd] = document.queryCommandState(cmd);
    });
    setActiveFormats(newActive);
  };

  const handleInput = () => {
    setContent(editorRef.current?.innerHTML || '');
    updateActiveFormats();
  };

  const handleLink = () => {
    const url = prompt('Введіть URL посилання:', 'https://');
    if (url) execCommand('createLink', url);
  };

  return (
    <EditorWrapper darkMode={darkMode}>
      <Toolbar>
        <Button darkMode={darkMode} active={activeFormats.bold} onClick={() => execCommand('bold')} title="Жирний (Ctrl+B)">
          <b>B</b>
        </Button>
        <Button darkMode={darkMode} active={activeFormats.italic} onClick={() => execCommand('italic')} title="Курсив (Ctrl+I)">
          <i>I</i>
        </Button>
        <Button darkMode={darkMode} active={activeFormats.underline} onClick={() => execCommand('underline')} title="Підкреслення (Ctrl+U)">
          <u>U</u>
        </Button>
        <Button darkMode={darkMode} active={activeFormats.strikeThrough} onClick={() => execCommand('strikeThrough')} title="Закреслення">
          <s>S</s>
        </Button>
        <Button darkMode={darkMode} active={activeFormats.insertOrderedList} onClick={() => execCommand('insertOrderedList')} title="Нумерований список">
          OL
        </Button>
        <Button darkMode={darkMode} active={activeFormats.insertUnorderedList} onClick={() => execCommand('insertUnorderedList')} title="Маркірований список">
          UL
        </Button>
        <Button darkMode={darkMode} onClick={handleLink} title="Вставити посилання">
          🔗
        </Button>
        <Button darkMode={darkMode} onClick={() => execCommand('undo')} title="Відмінити (Ctrl+Z)">
          ↺
        </Button>
        <Button darkMode={darkMode} onClick={() => execCommand('redo')} title="Повторити (Ctrl+Y)">
          ↻
        </Button>
        <Button darkMode={darkMode} onClick={() => execCommand('removeFormat')} title="Очистити форматування">
          🧹
        </Button>
        <Button darkMode={darkMode} onClick={() => setDarkMode(!darkMode)} title="Перемкнути тему">
          {darkMode ? '🌞' : '🌙'}
        </Button>
      </Toolbar>

      <EditableArea
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        spellCheck={true}
        aria-label="Текстовий редактор"
        darkMode={darkMode}
      ></EditableArea>

      <details style={{ marginTop: '1rem', fontSize: '0.85rem', color: darkMode ? '#aaa' : '#555' }}>
        <summary>HTML вміст (для налагодження)</summary>
        <pre style={{whiteSpace: 'pre-wrap', maxHeight: '200px', overflowY: 'auto'}}>
          {content || '(порожньо)'}
        </pre>
      </details>
    </EditorWrapper>
  );
};

export default RichTextEditor;
