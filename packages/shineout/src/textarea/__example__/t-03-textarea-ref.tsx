/**
 * cn - textareaRef
 *   --
 * en - textareaRef
 *    --
 */
import React from 'react';
import { Button, Textarea } from 'shineout';

export default () => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div>
      <Button onClick={handleFocus}>focus textarea</Button>
      <Textarea
        placeholder='input something'
        popover="bottom-left"
        clearable
        trim
        rows={8}
        info={v => `${v?.length || 0} characters`}
        textareaRef={textareaRef}
      />
    </div>
  );
};
