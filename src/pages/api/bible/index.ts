
import find from 'lodash/find';

import verses from  '@cms/verses'

export async function GET(request: any) {
  
    let searchParams = new URLSearchParams(request.url.search)

    let translation = searchParams.get('translation') ?? 'kjv'
    let reference: string = searchParams.get('reference') ?? ''
    
    return new Response(
      JSON.stringify({
        translation: translation,
        reference: reference,
        verse: getVerse(reference) ?? null
      })
    );
  };


function getVerse(reference: string) {
  return find(verses, (o) => { return o.reference == reference })   
}