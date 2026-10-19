# Gradcracker URL Reference

Public, unauthenticated pages. UK only. Verified 2026-09-07.

> robots.txt: `Allow: /` with `Disallow: /keyword-search` (free-text search), `/out`, `/campaign`, `/download`. This skill only uses `/search/...` and `/hub/...` pages.

## Search (discipline + region landing pages)

```
GET https://www.gradcracker.com/search/<discipline>/<subdiscipline>-graduate-jobs[-in-<region>]?order=<order>
```

| Segment | Values |
|---------|--------|
| `<discipline>/<subdiscipline>` | `computing-technology/{data-science,ai-machine-learning,computer-science,cyber-security,software-systems,web-development,information-technology,hardware}`; engineering: `{aerospace,chemical-process,civil-building,electronic-electrical,mechanical-manufacturing,all-disciplines}/engineering` |
| `-in-<region>` | `london`, `london-and-south-east`, `south-west`, `east-anglia`, `east-midlands`, `west-midlands`, `north-east`, `north-west`, `yorkshire`, `scotland`, `north-wales`, `south-wales`, `northern-ireland`, `republic-of-ireland`, `europe`, `brighton`; also `-in-<region>-with-<employer>` |
| `order` | `relevance`, `deadlines`, `start_date`, `dateAdded`, `grade_asc`, `grade_desc` |

No page parameter: the page renders ~60 cards and a Livewire "Show more" button.

### Result card anchors

Each card is `<article wire:key="<jobId>"> ... </article>`:

| Field | Anchor |
|-------|--------|
| id | `wire:key` |
| url, title | `<h2><a href="https://www.gradcracker.com/hub/<employerId>/<employer>/graduate-job/<jobId>/<slug>">Title</a></h2>` |
| company | `<img alt="<Employer>">` inside `<figure>`; employer hub link `/hub/<employerId>/<employer>` |
| disciplines | `<h3>` under the title |
| Deadline, Salary, Location, Degree required | label `<div>` followed by value; parsed positionally from the tag-stripped token list |
| "New" badge | first text token `New` |

A hidden `wire:key="hp"` article precedes the list and is skipped.

## Detail

```
GET https://www.gradcracker.com/hub/<employerId>/<employer>/graduate-job/<jobId>/<slug>
```

Slugs may be anything; the server redirects to canonical ones **only if `<employerId>` is correct** (otherwise it redirects to `/directory`).

| Field | Anchor |
|-------|--------|
| title | `<h1>`; also `<title>Title | Employer | Gradcracker</title>` |
| company | second segment of `<title>`; `og:url` is the employer hub |
| overview (Deadline, Starting, Hiring Multiple Candidates, Salary, Degree required, Location) | `<li><div class="...">Label</div> value</li>` in the `data-type="overview"` list |
| description | `<div class="job-description ...">` up to the `js__apply-button` anchor |
| apply link | `<a ... class="... js__apply-button">` |
