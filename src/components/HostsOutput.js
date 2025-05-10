import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';

const HostsOutput = ({ domains }) => {
  const [hostsContent, setHostsContent] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate hosts file content from domain data
    const validDomains = domains.filter(item => item.status === 'success');

    if (validDomains.length > 0) {
      // Group domains by category
      const domainsByCategory = {};

      validDomains.forEach(item => {
        const category = item.category || 'Cursor';
        if (!domainsByCategory[category]) {
          domainsByCategory[category] = [];
        }
        domainsByCategory[category].push(item);
      });

      // Generate content with sections
      let content = '';

      // Order categories: Cursor first, then alphabetically
      const categories = Object.keys(domainsByCategory).sort((a, b) => {
        if (a === 'Cursor') return -1;
        if (b === 'Cursor') return 1;
        return a.localeCompare(b);
      });

      // Add each category section
      categories.forEach((category, index) => {
        if (index > 0) content += '\n\n';
        content += `# ${category}\n`;
        content += domainsByCategory[category].map(item => `${item.ip}\t${item.domain}`).join('\n');
      });

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
        <h5 className="mb-0">Hosts 文件配置</h5>
        <Button
          variant={copied ? "success" : "outline-primary"}
          size="sm"
          onClick={handleCopy}
          disabled={!hostsContent}
          className={copied ? "copy-feedback" : ""}
        >
          {copied ? (
            <span>
              <i className="bi bi-check2"></i> 已复制!
            </span>
          ) : (
            <span>
              <i className="bi bi-clipboard"></i> 复制
            </span>
          )}
        </Button>
      </Card.Header>
      <Card.Body>
        {domains.length === 0 ? (
          <Alert variant="info" className="shadow-sm border-0">
            <div className="d-flex align-items-center">
              <span className="me-2">
                <i className="bi bi-info-circle"></i>
              </span>
              <span>正在加载域名信息...</span>
            </div>
          </Alert>
        ) : hostsContent ? (
          <div className="position-relative">
            <pre className="hosts-output mb-0">{hostsContent}</pre>
            <div className="position-absolute bottom-0 end-0 p-3 text-muted small">
              <i className="bi bi-hash"></i> {hostsContent.split('\n').length} entries
            </div>
          </div>
        ) : (
          <Alert variant="warning" className="shadow-sm border-0">
            <div className="d-flex align-items-center">
              <span className="me-2">
                <i className="bi bi-exclamation-triangle"></i>
              </span>
              <span>未找到有效的域名 IP 地址。</span>
            </div>
          </Alert>
        )}
      </Card.Body>
      <Card.Footer className="bg-white border-top-0 text-muted small">
        <div className="d-flex align-items-center">
          <i className="bi bi-info-circle me-2"></i>
          <span>将此内容复制到您的 hosts 文件中，以提高 Cursor、Windsurf 和 Augmentcode 服务的连接速度。</span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default HostsOutput;