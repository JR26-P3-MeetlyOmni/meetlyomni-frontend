import Image from "next/image";
import styles from "./page.module.css";
importtest;

/**
 * Displays a centered "Coming Soon" message indicating the page is under construction.
 *
 * Renders a simple placeholder UI for pages that are not yet available.
 */
export default function Placeholder() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Coming Soon</h1>
      <p>This page is under construction.</p>
    </div>
  );
}