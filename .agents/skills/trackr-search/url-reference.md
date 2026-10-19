# Trackr API Reference

Public JSON API behind `https://app.the-trackr.com` (Angular SPA). Verified 2026-09-07.
`robots.txt` on `the-trackr.com` and `app.the-trackr.com`: `Disallow:` (empty, everything allowed).

## Programmes (tracker contents)

```
GET https://api.the-trackr.com/programmes?region=<R>&industry=<I>&season=<Y>&type=<T>
```

| Param | Values (server validates; 422 with a message listing the options otherwise) |
|-------|------|
| `region` | `UK`, `US`, `EU`, `France`, `Germany`, `Italy`, `Hong Kong` |
| `industry` | `Finance`, `Tech`, `Law`, `Engineering` |
| `season` | `2024`, `2025`, `2026`, `2027`, `2028` |
| `type` | tab slug: `graduate-programmes`, `summer-internships`, `industrial-placements`, `off-cycle-internships`, `spring-weeks`, `insight-programmes`, `first-year-schemes`, `pre-university`, `full-time-programmes`, `training-contracts`, `vacation-schemes`, `non-law-internships`, `apprenticeships`, `events` |

Response: `{ "programmes": [...], "groups": [...] }` for populated tabs, or `[]` for an
empty tab **and** for a quota-exhausted client (distinguish via the `RateLimit` header).

Programme fields observed in the app bundle: `id`, `groupId`, `name`, `companyId`,
`companyName`, `url`, `status`, `closed`, `openingDate`, `closingDate`, `rolling`,
`location`/`locations`, `categories`, `disciplines`, `degree`, `sponsorsVisa`,
`lastYearOpening`, `process`, `currentStage`, `description`, `notes`, `region`, `industry`,
`season`, `type`. Company logos: `https://api.the-trackr.com/companies/logo/<companyId>`.

### Rate limit

```
RateLimit: "1000-in-1day"; r=960; t=72
RateLimit: "10-in-1day"; r=0; t=86226
RateLimit-Policy: "10-in-1day"; q=10; w=86400; pk=:<client-key>:
Retry-After: 86226
```

The `10-in-1day` policy applies to `/programmes`. When `r=0` the endpoint still answers
`200 []`.

## Other public endpoints seen in the bundle

- `GET /spring-weeks` — spring-week calendar (`id, name, dates, week, companyId, companyName`), not rate-limited to 10/day.
- Everything under `/users`, `/premium`, `/admin`, `/ai-cv-review`, `/ats-jobs` requires a login token and is out of scope.

## Tracker slugs (app navigation)

`uk-tech`, `uk-finance`, `uk-law`, `uk-engineering`, `us-tech`, `us-finance`, `eu-finance`,
`france-finance`, `germany-finance`, `italy-finance`, `hong-kong-finance`. Each maps to a
`region` + `industry` pair; the current season is `2027`.
