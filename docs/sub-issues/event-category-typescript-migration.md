# Sub-Issue: Migration of EventCategory to TypeScript

**Parent Issue:** #60 - Add weather agent to the simulation  
**Issue Type:** TypeScript Migration  
**Priority:** Medium  
**Estimated Effort:** 3-5 days  

## Overview

This sub-issue describes the migration of the EventCategory component to TypeScript as part of implementing the weather agent feature (Issue #60). The EventCategory component will be responsible for categorizing different types of weather events and their characteristics within the simulation's BDI (Belief-Desire-Intention) architecture.

## Background

The weather agent requires a robust system for categorizing and managing different types of weather events (e.g., rain, snow, storm, sunny, cloudy). The EventCategory component will serve as a foundational piece for the weather agent's belief system, allowing it to understand and react to different weather conditions.

Currently, the emeritus-agent project uses JavaScript with JSDoc annotations for type hints. This migration represents the first step toward adopting TypeScript for improved type safety and developer experience.

## Component Design

### EventCategory Structure

Based on the existing codebase patterns (similar to `Belief`, `Desire`, and `Intention` classes), the EventCategory component should include:

```typescript
export class EventCategory {
  constructor(
    name: string,
    severity: number,
    duration: number,
    effects: WeatherEffect[],
    transitions: EventTransition[]
  )
}
```

### Properties

- **name**: String identifier for the weather event (e.g., "Light Rain", "Heavy Storm")
- **severity**: Numeric value (0-100) indicating the intensity of the weather event
- **duration**: Expected duration in simulation ticks
- **effects**: Array of effects this weather event has on the environment
- **transitions**: Possible transitions to other weather events

### Methods

- `getName(): string`
- `getSeverity(): number`
- `getDuration(): number`
- `getEffects(): WeatherEffect[]`
- `getTransitions(): EventTransition[]`
- `canTransitionTo(category: EventCategory): boolean`
- `calculateProbability(currentConditions: WeatherConditions): number`

## Migration Tasks

### Phase 1: TypeScript Infrastructure Setup

- [ ] Install TypeScript development dependencies
  - `typescript`
  - `@types/node`
  - `@types/jest`
- [ ] Create `tsconfig.json` configuration
- [ ] Update build scripts to support TypeScript compilation
- [ ] Configure Jest to work with TypeScript files
- [ ] Update ESLint configuration for TypeScript support

### Phase 2: EventCategory Implementation

- [ ] Create `src/weather/` directory structure
- [ ] Implement `EventCategory.ts` class with proper TypeScript types
- [ ] Create supporting interfaces:
  - `WeatherEffect` interface
  - `EventTransition` interface  
  - `WeatherConditions` interface
- [ ] Add comprehensive JSDoc documentation
- [ ] Implement factory methods for common weather categories

### Phase 3: Integration with BDI System

- [ ] Create `WeatherBelief` class extending base `Belief`
- [ ] Implement integration with `BeliefManager`
- [ ] Create weather-specific desires and intentions
- [ ] Update `internal.js` exports to include new components

### Phase 4: Testing and Validation

- [ ] Create comprehensive unit tests for `EventCategory`
- [ ] Test integration with existing BDI components
- [ ] Validate TypeScript compilation and type checking
- [ ] Ensure backward compatibility with existing JavaScript code
- [ ] Update documentation with TypeScript examples

### Phase 5: Migration Strategy Documentation

- [ ] Document TypeScript adoption patterns for other components
- [ ] Create migration guidelines for future JavaScript-to-TypeScript conversions
- [ ] Update development documentation

## Technical Considerations

### Type Safety

The EventCategory implementation should leverage TypeScript's type system to:
- Prevent invalid weather event configurations
- Ensure type-safe transitions between weather states
- Provide compile-time validation for weather effect assignments

### Backward Compatibility

The migration must maintain compatibility with:
- Existing JavaScript components
- Current build and test infrastructure
- The module system using ES6 imports/exports

### Performance

TypeScript compilation should not negatively impact:
- Build times
- Runtime performance
- Memory usage during simulation

## Dependencies

### Required Before Starting

- [ ] Completion of basic weather agent structure (from parent issue #60)
- [ ] Decision on weather event taxonomy and classification system
- [ ] Agreement on TypeScript adoption strategy for the project

### Related Components

This migration will interact with:
- `Agent.js` - Weather agents will use EventCategory
- `Belief.js` - Weather beliefs will reference event categories
- `BeliefManager.js` - Managing weather-related beliefs
- `TypeUtils.js` - May need TypeScript equivalents

## Success Criteria

### Functional Requirements

- [ ] EventCategory correctly categorizes weather events
- [ ] Seamless integration with existing BDI architecture
- [ ] Type-safe weather event transitions
- [ ] Comprehensive unit test coverage (>90%)

### Non-Functional Requirements

- [ ] Zero runtime performance regression
- [ ] TypeScript compilation without errors or warnings
- [ ] Maintains existing JavaScript interoperability
- [ ] Clear and comprehensive documentation

## Risk Assessment

### High Risk
- **Breaking Changes**: Potential incompatibility with existing JavaScript code
- **Build Complexity**: Additional build steps and tooling complexity

### Medium Risk
- **Learning Curve**: Team adaptation to TypeScript development patterns
- **Dependency Management**: Managing both JavaScript and TypeScript dependencies

### Low Risk
- **Performance Impact**: Minimal runtime impact expected
- **Maintenance Overhead**: Well-established TypeScript ecosystem

## Timeline

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| Phase 1 | 1 day | TypeScript infrastructure |
| Phase 2 | 2 days | EventCategory implementation |
| Phase 3 | 1 day | BDI system integration |
| Phase 4 | 1 day | Testing and validation |
| Phase 5 | 0.5 days | Documentation |

**Total Estimated Duration:** 5.5 days

## Acceptance Criteria

1. EventCategory class fully implemented in TypeScript
2. All unit tests passing with >90% coverage
3. No build errors or TypeScript compilation issues
4. Successful integration with weather agent (parent issue #60)
5. Documentation updated to reflect TypeScript usage
6. No regression in existing functionality

## Notes

This migration serves as a pilot for broader TypeScript adoption in the emeritus-agent project. Lessons learned and patterns established here will inform future component migrations from JavaScript to TypeScript.

The EventCategory component will be the foundation for more sophisticated weather modeling, including seasonal patterns, climate zones, and weather prediction algorithms in future iterations.