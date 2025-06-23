import { useState } from 'react'

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Martinez',
      location: 'Springdale',
      petName: 'Bella & Max',
      rating: 5,
      text: 'Field & Foyer has been a lifesaver! With two large dogs, keeping our garden pristine was becoming impossible. Sarah and her team are reliable, professional, and our outdoor space has never looked better. Highly recommend!',
      service: 'Weekly Service'
    },
    {
      id: 2,
      name: 'Robert Chen',
      location: 'Riverside',
      petName: 'Charlie',
      rating: 5,
      text: 'I was skeptical at first, but after the first cleanup I was amazed. They\'re thorough, reasonably priced, and Charlie loves having a clean yard to play in. Worth every penny!',
      service: 'Bi-weekly Service'
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      location: 'Oak Hills',
      petName: 'Luna & Rocky',
      rating: 5,
      text: 'As a busy mom with two kids and two dogs, I don\'t have time for garden maintenance. Field & Foyer takes care of everything so we can just enjoy our outdoor sanctuary. The kids can play safely again!',
      service: 'Weekly Service'
    },
    {
      id: 4,
      name: 'David Wilson',
      location: 'Meadowbrook',
      petName: 'Buddy',
      rating: 5,
      text: 'Professional, punctual, and affordable. They show up every week like clockwork, even in bad weather. Buddy\'s yard is always spotless when I get home from work.',
      service: 'Weekly Service'
    },
    {
      id: 5,
      name: 'Amanda Rodriguez',
      location: 'Pine Valley',
      petName: 'Daisy',
      rating: 5,
      text: 'I love that they use eco-friendly methods. Daisy is sensitive to chemicals, so knowing they use safe, natural cleaning products gives me peace of mind. Great service!',
      service: 'Bi-weekly Service'
    },
    {
      id: 6,
      name: 'Michael Johnson',
      location: 'Sunset Ridge',
      petName: 'Zeus & Apollo',
      rating: 5,
      text: 'Two German Shepherds make a lot of mess! Field & Foyer handles it all with a smile. They\'re friendly, reliable, and our property value has definitely improved with a pristine garden.',
      service: 'Weekly Service'
    }
  ]

  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={i < rating ? '/images/icons/star.svg' : '/images/icons/star-empty.svg'}
        alt={i < rating ? 'Filled star' : 'Empty star'}
        className="w-6 h-6 inline-block"
      />
    ))
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-offwhite-50 via-cream-50 to-sage-50 section-padding">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-sage-900 mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-sage-700 leading-relaxed">
              Don't just take our word for it – hear from real customers who love
              our premium home and garden services.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="bg-cream-50 rounded-2xl p-8 md:p-12 relative shadow-lg border border-sage-100">
              <div className="text-center">
                <div className="mb-6">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                <blockquote className="text-xl md:text-2xl text-sage-800 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="space-y-2">
                  <p className="font-bold text-sage-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-sage-600 font-semibold">
                    {testimonials[currentTestimonial].petName}'s Parent • {testimonials[currentTestimonial].location}
                  </p>
                  <p className="text-sage-500">
                    {testimonials[currentTestimonial].service}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-offwhite-50 hover:bg-sage-50 rounded-full p-3 shadow-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-offwhite-50 hover:bg-sage-50 rounded-full p-3 shadow-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-sage-600' : 'bg-sage-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="section-padding bg-cream-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-4">
              All Customer Reviews
            </h2>
            <p className="text-xl text-sage-700">
              Read what all our happy customers have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="card-modern hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-sage-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                <div className="border-t border-sage-200 pt-4">
                  <p className="font-bold text-sage-900">{testimonial.name}</p>
                  <p className="text-sage-600 font-semibold text-sm">
                    {testimonial.petName}'s Parent
                  </p>
                  <p className="text-sage-500 text-sm">{testimonial.location}</p>
                  <p className="text-sage-500 text-sm mt-1">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-sage-600">
        <div className="container-max">
          <div className="text-center text-offwhite-50">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Our Track Record
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <p className="text-sage-100">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
                <p className="text-sage-100">Services Completed</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">99%</div>
                <p className="text-sage-100">Customer Satisfaction</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">5</div>
                <p className="text-sage-100">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-offwhite-50">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sage-900 mb-6">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-xl text-sage-700 mb-8 max-w-2xl mx-auto">
            Experience the same reliable, professional service that has earned us
            hundreds of 5-star reviews across all our home and garden services.
          </p>
          <a
            href="/contact"
            className="btn-primary text-lg"
          >
            Get Your Free Quote Today
          </a>
        </div>
      </section>
    </div>
  )
}

export default TestimonialsPage
