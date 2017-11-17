---
name: Static Resouces
category: Getting started
---

# Using static resources
Elements uses a set of static resources like images or icons. In order to benefit from caching across all apps, these resources are provided by a static asset CDN.

## When to use the ResouceProvider
Whenever you like to use Icons or Illustrations, you need to use the
ResouceProvider to let the components know where they are.

```example
<ThemeProvider>
    <ResourceProvider>
        <Icon name="trending-up" color="red" />
    </ResourceProvider>
</ThemeProvider>
```
