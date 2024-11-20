import { ReactElement, useEffect, useRef } from 'react';

interface EmailPreviewProps {
  html: string;
}

export function EmailPreview({ html }: EmailPreviewProps): ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframeDocument = iframeRef.current.contentDocument;
      if (iframeDocument) {
        iframeDocument.open();
        iframeDocument.write(html);
        iframeDocument.close();
      }
    }
  }, [html]);

  return (
      <iframe
        ref={iframeRef}
        className='h-[800px] w-full border-0 rounded-xl'
        title='Email preview'
      />
  );
}
