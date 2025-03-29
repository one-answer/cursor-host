import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

const HostsOutput = ({ domains }) => {
  const [hostsContent, setHostsContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate hosts file content from domain data
    const validDomains = domains.filter(item => item.status === 'success');
    
    if (validDomains.length > 0) {
      const content = validDomains.map(item => `${item.ip}\t${item.domain}`).join('\n');
      setHostsContent(content);
    } else {
      setHostsContent('');
    }
  }, [domains]);

  const handleCopy = () => {
    if (hostsContent) {
      navigator.clipboard.writeText(hostsContent)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  return (
    <Card className="shadow-sm h-100 position-relative">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Hosts File Configuration</h5>
        <Button 
          variant="outline-primary" 
          size="sm" 
          onClick={handleCopy}
          disabled={!hostsContent}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </Card.Header>
      <Card.Body>
        {domains.length === 0 ? (
          <Alert variant="info">Loading domain information...</Alert>
        ) : hostsContent ? (
          <pre className="hosts-output mb-0">{hostsContent}</pre>
        ) : (
          <Alert variant="warning">No valid domain IP addresses found.</Alert>
        )}
      </Card.Body>
    </Card>
  );
};

export default HostsOutput;