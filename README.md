# SNAS Not a Scam

A Chrome extension that warns the user if a website is a scam.

## Data list format
```javascript
{
  // Key for matching the scam's website
  // can have a subdomain, avoid adding a path
  // We're only looking for hostname here
  scamHost: string;

  // The source that listed the website for being a scam with proofs
  source: string;

  // Recommend other certified websites
  // This extension is not for advertisement, so the list has to be as exhaustive
  // as possible
  recommendations?: string[];
}
```

You would like new fields? Please fill an issue [here](https://github.com/Chaine-de-Blocs/SNAS/issues).

## Trusted URIs

Cryptoblocs : https://cryptoblocs.fr/assets/scamscan.json

## Contribute

Feel free to make a PR and to fill an issue.

If your want to add websites to the list, PR [this](https://github.com/Slaals/slaals.github.io/blob/master/assets/scamscan.json). 
