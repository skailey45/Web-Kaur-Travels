// Common styles for all email templates
export const emailStyles = {
  container: `
    background-color: #f3f4f6;
    padding: 40px 20px;
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #1f2937;
  `,
  wrapper: `
    max-width: 600px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  `,
  header: `
    background: linear-gradient(to right, #2563eb, #4f46e5);
    padding: 40px 20px;
    text-align: center;
    color: white;
  `,
  logo: `
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 12px;
    display: inline-block;
    margin-bottom: 20px;
  `,
  title: `
    font-size: 28px;
    font-weight: bold;
    margin: 0;
    padding: 0;
    color: white;
  `,
  subtitle: `
    font-size: 16px;
    opacity: 0.9;
    margin: 10px 0 0;
  `,
  content: `
    padding: 40px;
  `,
  section: `
    margin-bottom: 30px;
  `,
  sectionTitle: `
    font-size: 20px;
    font-weight: bold;
    color: #1f2937;
    margin: 0 0 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #e5e7eb;
  `,
  infoBox: `
    background-color: #f8fafc;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
  `,
  infoRow: `
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e5e7eb;
  `,
  infoLabel: `
    color: #6b7280;
    font-weight: 500;
  `,
  infoValue: `
    color: #1f2937;
    font-weight: 600;
  `,
  button: `
    display: inline-block;
    background: linear-gradient(to right, #2563eb, #4f46e5);
    color: white;
    padding: 14px 28px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    text-align: center;
    transition: all 0.3s ease;
  `,
  footer: `
    text-align: center;
    padding: 30px;
    background-color: #f8fafc;
    border-top: 1px solid #e5e7eb;
  `,
  footerText: `
    color: #6b7280;
    font-size: 14px;
    margin: 5px 0;
  `,
  footerLink: `
    color: #2563eb;
    text-decoration: none;
    margin: 0 10px;
  `,
  badge: `
    display: inline-block;
    padding: 6px 12px;
    background-color: #dbeafe;
    color: #2563eb;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
  `,
  highlight: `
    color: #2563eb;
    font-weight: 600;
  `,
  divider: `
    height: 1px;
    background-color: #e5e7eb;
    margin: 20px 0;
  `,
  alert: `
    background-color: #fef3c7;
    border: 1px solid #fcd34d;
    color: #92400e;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
  `,
  success: `
    background-color: #d1fae5;
    border: 1px solid #6ee7b7;
    color: #065f46;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
  `,
  companyInfo: `
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
    font-size: 12px;
    color: #6b7280;
    text-align: center;
  `
};

// Helper function to inline CSS
export const inlineStyle = (styles: string) => {
  return styles
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};