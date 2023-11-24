import _ from 'lodash';

import cmsClient from '@cms/client';

const verses = (await cmsClient.fetch('verses')) as Verse[];

export const get = (request: any) => {
  
    let searchParams = new URLSearchParams(request.url.search)

    let translation = searchParams.get('translation') ?? 'kjv'
    let reference: string = searchParams.get('reference') ?? ''
  
    return new Response(
      JSON.stringify({
        translation: translation,
        reference: reference,
        verse: getVerse(reference)
      })
    );
  };


function getVerse(reference: string) {
  return _.find(verses, (o) => { return o.reference == reference })   
}