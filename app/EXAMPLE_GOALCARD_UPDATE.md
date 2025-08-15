# 🎯 EXAMPLE: GoalCard Theme Update

## BEFORE vs AFTER Comparison

### ❌ BEFORE (Hardcoded Styles)
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1F1F',      // Hardcoded
    borderRadius: 12,                // Hardcoded
    padding: 16,                     // Hardcoded
    shadowColor: '#000',             // Custom shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,                    // Hardcoded
    fontWeight: 'bold',              // Hardcoded
    color: '#FFFFFF',                // Hardcoded
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,                    // Hardcoded
    color: '#CCCCCC',                // Hardcoded
  },
});
```

### ✅ AFTER (Theme System)
```typescript
import theme from '../styles/theme';

const styles = StyleSheet.create({
  card: {
    ...theme.components.card.elevated,  // Consistent card style
    // All shadows, colors, radius handled automatically
  },
  title: {
    ...theme.textStyles.h4,            // Semantic typography
    marginBottom: theme.spacing[2],     // Consistent spacing
  },
  progressLabel: {
    ...theme.textStyles.bodySecondary,  // Semantic typography
  },
});
```

## 🎨 Even Better: Using UI Components

### 🚀 OPTIMAL APPROACH
```typescript
import { Card, Typography } from '../components/ui';

export default function GoalCard(props) {
  return (
    <Card variant="elevated" style={styles.customCardStyle}>
      <Typography variant="h4" style={{ marginBottom: theme.spacing[2] }}>
        {props.title}
      </Typography>
      
      <Typography variant="bodySecondary">
        Progress
      </Typography>
      
      {/* Rest of component */}
    </Card>
  );
}
```

## 📊 Benefits of Update

1. **Consistency**: All cards look the same across app
2. **Maintainability**: Change theme.ts → entire app updates
3. **Professional**: Proper shadows, typography, spacing
4. **Speed**: No more guessing colors/sizes
5. **Scalable**: Easy to add new variants

## ⚡ Quick Update Process

1. **Replace hardcoded colors** with `theme.colors.X`
2. **Replace custom shadows** with `...theme.shadows.lg`
3. **Replace font styles** with `...theme.textStyles.X`
4. **Replace spacing** with `theme.spacing[X]`
5. **Test visual result**

**Time: 3-5 minutes per component**
