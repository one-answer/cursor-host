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
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h1 className="text-center mb-4">Cursor Host Configuration Generator</h1>
                <p className="text-center text-muted">
                  实时获取指定域名的IP信息，自动生成hosts配置文件
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    {lastUpdated && (
                      <small className="text-muted">
                        Last updated: {lastUpdated.toLocaleString()}
                      </small>
                    )}
                  </div>
                  <Button 
                    variant="primary" 
                    onClick={fetchAllDomains} 
                    disabled={loading}
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
              <Alert variant="danger">{error}</Alert>
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
      </Container>
    </div>
  );
}

export default App;