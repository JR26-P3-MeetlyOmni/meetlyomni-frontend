'use client';

import { useState } from 'react';

import { faqData } from './FaqAccordion.data';
import styles from './FaqAccordion.module.css';
import { AccordionItemProps } from './FaqAccordion.types';

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => (
  <div className={styles.faqItem}>
    <button className={styles.faqQuestion} onClick={onClick}>
      {question}
      <span>{isOpen ? '−' : '+'}</span>
    </button>
    {isOpen && <div className={styles.faqAnswer}>{answer}</div>}
  </div>
);

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqContainer}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </section>
  );
}
