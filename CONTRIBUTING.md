# Contributing to OpenDX

Cảm ơn bạn đã quan tâm đến việc đóng góp cho OpenDX! 🎉

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng, dù là báo cáo lỗi, đề xuất tính năng mới, cải thiện documentation, hay đóng góp code.

## 📋 Mục lục

- [Code of Conduct](#code-of-conduct)
- [Bắt đầu đóng góp như thế nào](#bắt-đầu-đóng-góp-như-thế-nào)
- [Quy trình đóng góp](#quy-trình-đóng-góp)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Báo cáo Bug](#báo-cáo-bug)
- [Đề xuất tính năng](#đề-xuất-tính-năng)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

### Cam kết của chúng tôi

Chúng tôi cam kết tạo ra một môi trường cởi mở và thân thiện cho mọi người, không phân biệt:
- Tuổi tác
- Giới tính
- Khuyết tật
- Dân tộc
- Kinh nghiệm
- Quốc tịch
- Ngoại hình
- Tôn giáo

### Hành vi được khuyến khích

- ✅ Sử dụng ngôn ngữ thân thiện và hòa nhã
- ✅ Tôn trọng quan điểm và kinh nghiệm khác nhau
- ✅ Chấp nhận phê bình mang tính xây dựng
- ✅ Tập trung vào điều tốt nhất cho cộng đồng
- ✅ Thể hiện sự đồng cảm với các thành viên khác

### Hành vi không được chấp nhận

- ❌ Sử dụng ngôn ngữ hoặc hình ảnh mang tính tình dục
- ❌ Troll, bình luận xúc phạm hoặc công kích cá nhân
- ❌ Quấy rối công khai hoặc riêng tư
- ❌ Công bố thông tin riêng tư của người khác
- ❌ Hành vi không chuyên nghiệp khác

---

## Bắt đầu đóng góp như thế nào

### Các cách đóng góp

1. **Báo cáo Bug** 🐛
   - Tìm và báo cáo lỗi trong ứng dụng
   - Cung cấp thông tin chi tiết để reproduce

2. **Đề xuất tính năng** 💡
   - Đề xuất tính năng mới
   - Cải thiện tính năng hiện có

3. **Cải thiện Documentation** 📚
   - Sửa typos
   - Thêm examples
   - Làm rõ hướng dẫn

4. **Viết Code** 💻
   - Fix bugs
   - Implement features
   - Refactor code
   - Optimize performance

5. **Review Code** 👀
   - Review Pull Requests
   - Test features
   - Provide feedback

### Issues tốt cho người mới bắt đầu

Tìm các issues được đánh dấu:
- `good first issue` - Phù hợp cho người mới
- `help wanted` - Cần sự giúp đỡ
- `documentation` - Liên quan đến docs
- `bug` - Bug fixes

---

## Quy trình đóng góp

### 1. Fork Repository

```bash
# Truy cập https://github.com/Tuan04-D/opendx
# Click nút "Fork" ở góc trên bên phải
```

### 2. Clone Fork của bạn

```bash
git clone https://github.com/YOUR-USERNAME/opendx.git
cd opendx

# Thêm upstream remote
git remote add upstream https://github.com/Tuan04-D/opendx.git
```

### 3. Tạo Branch mới

```bash
# Luôn tạo branch mới từ main
git checkout main
git pull upstream main

# Tạo branch với tên mô tả
git checkout -b feature/add-new-chart
git checkout -b fix/database-connection
git checkout -b docs/update-installation-guide
```

**Quy ước đặt tên branch:**
- `feature/` - Tính năng mới
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Thêm hoặc cập nhật tests
- `chore/` - Maintenance tasks

### 4. Thực hiện thay đổi

```bash
# Làm việc trên code của bạn
# Test kỹ lưỡng

# Check status
git status

# Add changes
git add .

# Commit với message rõ ràng
git commit -m "feat: add interactive pie chart component"
```

### 5. Sync với Upstream

```bash
# Trước khi push, sync với upstream
git fetch upstream
git rebase upstream/main

# Giải quyết conflicts nếu có
```

### 6. Push lên Fork

```bash
git push origin feature/add-new-chart
```

### 7. Tạo Pull Request

1. Truy cập fork của bạn trên GitHub
2. Click "Compare & pull request"
3. Điền thông tin chi tiết
4. Submit PR

---

## Coding Standards

### Python (Backend)

#### Style Guide

Tuân theo [PEP 8](https://pep8.org/):

```python
# ✅ Good
def calculate_total_revenue(items: list) -> float:
    """
    Calculate total revenue from list of items.
    
    Args:
        items: List of item dictionaries with 'price' key
        
    Returns:
        Total revenue as float
    """
    return sum(item.get('price', 0) for item in items)


# ❌ Bad
def calc(i):
    return sum(x['price'] for x in i)
```

#### Best Practices

- ✅ Use type hints
- ✅ Write docstrings cho functions/classes
- ✅ Keep functions small và focused
- ✅ Use meaningful variable names
- ✅ Avoid magic numbers
- ✅ Handle exceptions properly

```python
# ✅ Good
MAX_RETRY_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

def fetch_data(url: str, timeout: int = DEFAULT_TIMEOUT) -> dict:
    """Fetch data from API with retry logic."""
    for attempt in range(MAX_RETRY_ATTEMPTS):
        try:
            response = requests.get(url, timeout=timeout)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            if attempt == MAX_RETRY_ATTEMPTS - 1:
                raise
            time.sleep(2 ** attempt)
```

#### Django Specific

```python
# Models
class DataPoint(models.Model):
    """Represents a single data point in the system."""
    
    class Meta:
        db_table = 'data_points'
        ordering = ['-created_at']
        verbose_name = 'Data Point'
        verbose_name_plural = 'Data Points'

# Views
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class DataPointViewSet(viewsets.ModelViewSet):
    """API endpoint for data points."""
    queryset = DataPoint.objects.all()
    serializer_class = DataPointSerializer
    permission_classes = [IsAuthenticated]
```

### TypeScript/JavaScript (Frontend)

#### Style Guide

Tuân theo [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript):

```typescript
// ✅ Good
interface ChartData {
  label: string;
  value: number;
  color?: string;
}

const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};


// ❌ Bad
const calc = (n) => {
  var s = 0;
  for (var i = 0; i < n.length; i++) {
    s += n[i];
  }
  return s / n.length;
};
```

#### React/Next.js Best Practices

```typescript
// ✅ Good - Functional component with TypeScript
import React, { useState, useEffect } from 'react';

interface Props {
  title: string;
  data: ChartData[];
  onUpdate?: (data: ChartData[]) => void;
}

export const Chart: React.FC<Props> = ({ title, data, onUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Cleanup
    return () => {
      // Cleanup logic
    };
  }, [data]);
  
  return (
    <div className="chart-container">
      <h2>{title}</h2>
      {/* Chart rendering */}
    </div>
  );
};
```

#### CSS/Tailwind

```tsx
// ✅ Good - Consistent Tailwind classes
<div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-md">
  <h3 className="text-lg font-semibold text-gray-900">Title</h3>
  <p className="text-sm text-gray-600">Description</p>
</div>

// ❌ Bad - Inconsistent, hard to read
<div className="flex bg-white p-6 flex-col shadow-md rounded-lg gap-4 items-center justify-between">
```

### General Rules

- ✅ Use 2 spaces cho indentation (TypeScript)
- ✅ Use 4 spaces cho indentation (Python)
- ✅ Không commit commented code
- ✅ Xóa console.logs trước khi commit
- ✅ Không commit TODO comments
- ✅ Keep line length < 100 characters
- ✅ Use English cho tất cả code và comments

---

## Commit Messages

### Format

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Tính năng mới
- `fix`: Bug fix
- `docs`: Thay đổi documentation
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Refactor code
- `perf`: Performance improvement
- `test`: Thêm hoặc update tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```bash
# Feature
git commit -m "feat(api): add endpoint for forecast data"

# Bug fix
git commit -m "fix(map): resolve tooltip positioning issue"

# Documentation
git commit -m "docs(readme): update installation steps"

# With body
git commit -m "feat(dashboard): add export to PDF functionality

- Add PDF generation library
- Create export button component
- Implement export service
- Add loading state during export

Closes #123"

# Breaking change
git commit -m "feat(api)!: change authentication to JWT

BREAKING CHANGE: API now requires JWT tokens instead of session auth.
Clients need to update authentication flow."
```

### Rules

- ✅ Use present tense ("add feature" not "added feature")
- ✅ Use imperative mood ("move cursor to..." not "moves cursor to...")
- ✅ Không viết hoa chữ cái đầu
- ✅ Không dấu chấm ở cuối subject
- ✅ Limit subject line to 50 characters
- ✅ Separate subject from body with blank line
- ✅ Wrap body at 72 characters
- ✅ Explain what and why, not how

---

## Pull Request Process

### Trước khi Submit PR

- [ ] Code đã được test kỹ lưỡng
- [ ] Tất cả tests đều pass
- [ ] Code tuân theo style guide
- [ ] Documentation đã được cập nhật
- [ ] Commit messages theo format
- [ ] Branch đã sync với upstream/main
- [ ] Không có conflicts

### PR Template

```markdown
## Description
Brief description của thay đổi

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (nếu có)
[Add screenshots here]

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] Dependent changes merged

## Related Issues
Closes #123
Relates to #456
```

### Review Process

1. **Automated Checks** (nếu có CI/CD)
   - Linting
   - Tests
   - Build

2. **Code Review**
   - Ít nhất 1 reviewer approve
   - Tất cả comments được resolved

3. **Final Check**
   - No merge conflicts
   - Up-to-date với main branch

4. **Merge**
   - Squash and merge (preferred)
   - Create merge commit (for features)

---

## Báo cáo Bug

### Trước khi báo cáo

1. **Search existing issues** - Bug đã được report chưa?
2. **Verify it's a bug** - Không phải là misconfiguration?
3. **Try latest version** - Bug vẫn còn trong version mới nhất?

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 11]
 - Browser: [e.g. Chrome 120]
 - Python version: [e.g. 3.11.5]
 - Node version: [e.g. 18.17.0]
 - PostgreSQL version: [e.g. 15.3]

**Additional context**
Add any other context about the problem here.

**Logs**
```
Paste relevant logs here
```
```

---

## Đề xuất tính năng

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.
Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request here.

**Willingness to contribute**
Are you willing to submit a PR for this feature?
- [ ] Yes
- [ ] No
- [ ] Need help
```

---

## Development Setup

### Backend Setup

```bash
# Clone repository
git clone https://github.com/Tuan04-D/opendx.git
cd opendx

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Setup database
createdb opendx_db
python backend/backend/manage.py migrate

# Run development server
python backend/backend/manage.py runserver
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

### Development Tools

```bash
# Python linting
pip install flake8 black isort
flake8 .
black .
isort .

# JavaScript/TypeScript linting
npm run lint

# Type checking
npm run type-check
```

---

## Testing

### Backend Tests

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test app.tests

# Run with coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

### Frontend Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- ComponentName
```

### Writing Tests

```python
# Python test example
from django.test import TestCase
from app.models import DataPoint

class DataPointTestCase(TestCase):
    def setUp(self):
        self.data_point = DataPoint.objects.create(
            name="Test",
            value=100
        )
    
    def test_data_point_creation(self):
        """Test that data point is created correctly"""
        self.assertEqual(self.data_point.name, "Test")
        self.assertEqual(self.data_point.value, 100)
```

```typescript
// TypeScript test example
import { render, screen } from '@testing-library/react';
import { Chart } from './Chart';

describe('Chart Component', () => {
  it('renders chart title', () => {
    render(<Chart title="Test Chart" data={[]} />);
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });
});
```

---

## Documentation

### Documentation cần update khi

- ✅ Thêm tính năng mới
- ✅ Thay đổi API
- ✅ Thay đổi configuration
- ✅ Thay đổi dependencies
- ✅ Fix bug quan trọng

### Documentation Standards

- Viết rõ ràng, súc tích
- Sử dụng examples
- Keep updated
- Include screenshots khi cần
- Link to related docs

---

## Questions?

Nếu bạn có câu hỏi:

1. **Check Documentation** - README, INSTALL, guides
2. **Search Issues** - Câu hỏi đã được hỏi chưa?
3. **Create Discussion** - Tạo GitHub Discussion
4. **Ask in PR** - Comment trong Pull Request

---

## License

Bằng việc đóng góp, bạn đồng ý rằng contributions của bạn sẽ được license dưới MIT License.

---

## Thank You! 🙏

Cảm ơn bạn đã dành thời gian đóng góp cho OpenDX!

Mọi đóng góp, dù lớn hay nhỏ, đều được đánh giá cao và giúp project này ngày càng tốt hơn.

**Happy Contributing! 🚀**