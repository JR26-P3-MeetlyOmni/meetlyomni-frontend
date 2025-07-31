'use client';

import { useState } from 'react';

import { FAQ_DATA } from './FaqAccordion.data';
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
  const [openId, setOpenId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.faqContainer}>
      <h2 className={styles.heading}>Frequently Asked Questions</h2>
      {FAQ_DATA.map(faq => (
        <AccordionItem
          key={faq.id}
          question={faq.question}
          answer={faq.answer}
          isOpen={openId === faq.id}
          onClick={() => handleClick(faq.id)}
        />
      ))}
    </section>
  );
}
