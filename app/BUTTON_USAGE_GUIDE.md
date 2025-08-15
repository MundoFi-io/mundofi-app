# Updated Button Component Usage Guide

## ✅ New Button Variants Available

Your Button component now supports 5 distinct variants matching your design system:

### Import:
```typescript
import { Button } from '../components/ui';
```

### Button Variants:

#### 1. **Primary** (Default)
```typescript
<Button 
  title="Primary Button" 
  onPress={handlePress}
  variant="primary"
/>
```
- **Background**: #F2F2F2 (light gray)
- **Text**: #000000 (black)
- **Font**: Geist-Medium
- **Radius**: 30px

#### 2. **Secondary**
```typescript
<Button 
  title="Secondary Button" 
  onPress={handlePress}
  variant="secondary"
/>
```
- **Background**: #000000 (black)
- **Border**: #222531 (dark gray)
- **Text**: #F2F2F2 (light gray)
- **Font**: Geist-Medium
- **Radius**: 30px

#### 3. **Brand Primary** (Use only when specified)
```typescript
<Button 
  title="Brand Primary" 
  onPress={handlePress}
  variant="brandPrimary"
/>
```
- **Background**: #001847 (dark blue)
- **Text**: #4C86FF (blue)
- **Font**: Geist-Medium
- **Radius**: 30px

#### 4. **Success**
```typescript
<Button 
  title="Success Action" 
  onPress={handlePress}
  variant="success"
/>
```
- **Background**: #003D23 (dark green)
- **Text**: #0CE98A (green)
- **Font**: Geist-Medium
- **Radius**: 30px

#### 5. **Danger**
```typescript
<Button 
  title="Delete Item" 
  onPress={handlePress}
  variant="danger"
/>
```
- **Background**: #3D0000 (dark red)
- **Text**: #F43434 (red)
- **Font**: Geist-Medium
- **Radius**: 30px

### Additional Props:
- `fullWidth={true}` - Makes button 100% width
- `disabled={true}` - 60% opacity, prevents press
- `loading={true}` - Shows spinner with matching text color
- `style` - Override container styles
- `textStyle` - Override text styles

### Examples in Screens:
- **Welcome Screen**: Updated "Get Started" to use Primary variant
- **Add Funds Modal**: Recommend Success variant for "Add Funds"
- **Goal Creation**: Success variant for "Create Goal"
- **Delete Actions**: Use Danger variant

All buttons automatically use Geist-Medium font and 16px vertical padding as specified!
