---
title: note-ds-n-algo-11
comment: true
cc: true
pinned: false
hidden: true
date: 2023-05-08 09:53:42
updated: 2023-05-08 09:53:42
summary:
tags:
---
# Stable Sort ALgorithm
### Radix Sort:
idea: Apply stable bucket sort on each digit

for every digit from low to high:\
    do bucket sort to put the whole num into **queue**
    then pop out of the queue from 0 to 9 (**caution: queue is FIFO**)

drawback: memory-demanding ($\Theta(10n)$)
complexity: $O(mn),\ m\ refers\ to\ the\ max\ number\ of\ bits\ of\ input$

### Shell Sort (diminishing increment sort)

### External Sort
* For the input that is too large to be all incorporated into the memory
Slice the sequence and sort one by one, then keep a pointer for each slice indicating the first element of the slice, then merge the slices into the full sequence.
