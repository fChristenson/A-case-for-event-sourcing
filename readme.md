# A case for event sourcing

## What we will cover

* What is event sourcing?
* How is it different from traditional storage?
* What are some of the benefits?
* What are some of the downsides?

## Notes

Event sourcing is a method of storing data by saving events
instead of doing updates to a model.

Every event that causes an update to the system is saved so that
the state of the database can be recreated through the events.

With event sourcing we can drop our models and recreate them whenever
we want, we can also replay the events until the model is in a state we want.

## The good

We can know what our state was at any point in time and recreate it whenever
we want.

We can see every change to the system which is amazing for traceability.


## The bad

We need to store more data.

If we want to change an existing field on a model it is a bit of a hazzle.

There is more code.
