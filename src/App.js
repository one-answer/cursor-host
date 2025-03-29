import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import './App.css';
import DomainList from './components/DomainList';
import HostsOutput from './components/HostsOutput';
import { fetchDomainIps } from './services/dnsService';

const domains = [
  'api2.cursor.sh',
  'api3.cursor.sh',
  'repo42.cursor.sh',
  'api4.cursor.sh',
  'us-asia.gcpp.cursor.sh',
  'us-eu.gcpp.cursor.sh',
  'us-only.gcpp.cursor.sh',
  'marketplace.cursorapi.com',
  'cursor-cdn.com',
  'download.todesktop.com'
];

function App() {
  const [domainData, setDomainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchAllDomains = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(domains.map(domain => fetchDomainIps(domain)));
      const domainResults = results.map((result, index) => ({
        domain: domains[index],
        ip: result.ip || 'Failed to resolve',
        status: result.ip ? 'success' : 'error',
        timestamp: new Date().toISOString()
      }));
      
      setDomainData(domainResults);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching domain IPs:', err);
      setError('Failed to fetch domain information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDomains();
    
    // Set up auto-refresh every 15 minutes
    const intervalId = setInterval(() => {
      fetchAllDomains();
    }, 15 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body className="app-header py-4">
                <div className="text-center mb-3">
                  <img 
                    src="/cursor-host-icon.svg" 
                    alt="Cursor Host Logo" 
                    className="app-logo mb-3"
                    width="80"
                    height="80"
                  />
                  <h1 className="mb-2">Cursor Host Configuration Generator</h1>
                </div>
                <p className="text-center text-muted mb-4">
                  实时获取域名的IP信息，自动生成hosts配置文件
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {lastUpdated && (
                      <span className="last-updated">
                        Last updated: {lastUpdated.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="primary" 
                    onClick={fetchAllDomains} 
                    disabled={loading}
                    className="px-4"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Updating...
                      </>
                    ) : (
                      'Refresh Now'
                    )}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {error && (
          <Row className="mb-4">
            <Col>
              <Alert variant="danger" className="shadow-sm border-0">{error}</Alert>
            </Col>
          </Row>
        )}

        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <DomainList domains={domainData} loading={loading} />
          </Col>
          <Col md={6}>
            <HostsOutput domains={domainData} />
          </Col>
        </Row>
        
        <Row className="mt-4">
          <Col>
            <div className="text-center text-muted small">
              <p>© {new Date().getFullYear()} Cursor Host Generator. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;