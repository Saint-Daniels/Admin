'use client';

import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginModal({ show, onHide }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="login-modal"
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <div className="text-center w-100">
          <Image 
            src="/images/saintdanielslogo.jpeg" 
            alt="Saint Daniels Logo" 
            width={60} 
            height={60} 
            className="mb-2"
          />
          <h4 className="mb-0">Welcome Back</h4>
          <p className="text-muted small mb-0">Please sign in to your account</p>
        </div>
      </Modal.Header>
      
      <Modal.Body className="pt-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control-lg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label>Password</Form.Label>
              <Link href="/forgot-password" className="text-primary text-decoration-none small">
                Forgot password?
              </Link>
            </div>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control-lg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="remember-me"
              label="Remember me"
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-2 mb-3"
          >
            Sign In
          </Button>

          <div className="text-center">
            <p className="mb-0">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
} 