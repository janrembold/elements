import { configure, shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createSerializer } from 'enzyme-to-json'
import renderer from 'react-test-renderer'

// Adapter for React 16.
configure({ adapter: new Adapter() })

// Add serializer for enzyme-to-json.
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

// Avoid annoying imports in all the tests.
global.mount = mount
global.render = render
global.renderer = renderer
global.shallow = shallow
