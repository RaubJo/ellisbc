import React from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import _ from 'lodash';

function DoctrineAccordion({data}) {
  return (
    <Accordion.Root
      className='bg-white w-full lg:w-3/4 mx-auto rounded-md shadow-[0_2px_10px] shadow-black/5'
      type="multiple"
      collapsible="true"
    >
      
        {data.map((doctrine) => (
              <AccordionItem value={doctrine.title} key={doctrine.title}>
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
      'focus-within:shadow-mauve1 mt-[2px] overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
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
        'text-gray11 shadow-gray6 hover:bg-gray6 group flex h-12 flex-1 cursor-default items-center justify-between bg-gray3 px-5 text-8 leading-none shadow-[0_1px_0] outline-none transition-colors ease-in-out duration-150',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-gray10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, content, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'text-gray11 bg-gray2 my-px data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-8',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-8 px-4" dangerouslySetInnerHTML={{__html: content}}></div>
  </Accordion.Content>
));

export default DoctrineAccordion;