import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import _ from 'lodash';

function DoctrineAccordion({beliefs}) {
  return (
    <Accordion.Root
      className='bg-white w-full lg:w-3/4 mx-auto rounded-md shadow-[0_2px_10px] shadow-black/5'
      type="single"
      collapsible
    >
      
        {beliefs.map((doctrine) => (
              <AccordionItem value={doctrine.title}>
                <AccordionTrigger>{doctrine.title}</AccordionTrigger>
                <AccordionContent content={doctrine.content} />
              </AccordionItem>
        ))}
      
    </Accordion.Root>
  )
}

const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={classNames(
      'focus-within:shadow-mauve1 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        'text-violet11 shadow-mauve6 hover:bg-mauve4 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-mauve3 px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, content, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5" dangerouslySetInnerHTML={{__html: content}}></div>
  </Accordion.Content>
));

export default DoctrineAccordion;